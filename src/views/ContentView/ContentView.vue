<script setup lang="ts">
import { watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import useGoodNightTaleStore from '@/stores/goodnighttale'
import AlertToast from '@/components/AlertToast.vue'
import CarouselComponent from '@/views/ContentView/CarouselComponent.vue'
import CarouselSlide from '@/views/ContentView/CarouselSlide.vue'
import AppHeader from '@/components/AppHeader.vue'
import constants from '@/constants/constants.ts'
import useImagesStore from '@/stores/images'
import usePromptsStore from '@/stores/prompts'
import usePagesStore from '@/stores/pages'
import { compareCreatedAt, generateImages, createPages, addNewImages } from './utils'
import { callChatGPT, extractPromptsForImages } from '../InitView/utils'

const router = useRouter()
const taleStore = useGoodNightTaleStore()
const imagesStore = useImagesStore()
const promptStore = usePromptsStore()
const pagesStore = usePagesStore()
const imagesRegenerating = ref(false)

const checkImageValidity = async () => {
  pagesStore.pages = pagesStore.getPagesFromLocalStorage()
  if (pagesStore.pages && compareCreatedAt()) {
    imagesStore.isImagesRequestFailed = false
    imagesRegenerating.value = true
    try {
      const prompts = localStorage.getItem(constants.imagesStorageKey)
      const response = await generateImages(JSON.parse(prompts!))
      const imageUrls: string[] = (await response.map((r) => r?.data[0].url)) as string[]
      const storedPages = localStorage.getItem(constants.pagesStorageKey)
      const obj: string[] = JSON.parse(storedPages!)
      pagesStore.pages = addNewImages(obj, imageUrls)
      pagesStore.savePagesToLocalStorage()

      imagesStore.created = Date.now()
      imagesStore.saveCreatedToLocalStorage()
    } catch (error) {
      imagesStore.isImagesRequestFailed = true
      throw new Error(`An error has occured while creating the images:  ${error}`)
    }
    imagesRegenerating.value = false
  }
}
if (!taleStore.generationInProgress) checkImageValidity()

watch(
  () => taleStore.tale,
  async () => {
    if (!taleStore.isTaleRequestFailed) {
      promptStore.updatePrompt({ role: 'assistant', content: taleStore.tale })
      promptStore.updatePrompt({ role: 'user', content: constants.dallEPrompt })
      try {
        const response = await callChatGPT(promptStore.stream)
        const prompts = await response?.choices[0].message.content
        promptStore.imagesPrompts = extractPromptsForImages(prompts as string)
        promptStore.saveImagesPromptsToLocalStorage()
      } catch (error) {
        taleStore.isTaleRequestFailed = true
        throw new Error(`Failed to create prompts for DALL-E. ${error}`)
      }
    }
  }
)

watch(
  () => promptStore.imagesPrompts,
  async () => {
    try {
      const response = await generateImages(promptStore.imagesPrompts)
      imagesStore.imageUrls = response.map((r) => r?.data[0].url)
      imagesStore.created = Date.now()
      imagesStore.saveCreatedToLocalStorage()
    } catch (error) {
      imagesStore.isImagesRequestFailed = true
      throw new Error(`An error has occured while creating the images:  ${error}`)
    }
  }
)

watch(
  () => imagesStore.imageUrls,
  async () => {
    if (imagesStore.imageUrls && imagesStore.imageUrls.length === 2) {
      const parts = taleStore.tale?.split('\n\n')
      if (parts) {
        pagesStore.pages = createPages(parts, imagesStore.imageUrls)
        pagesStore.savePagesToLocalStorage()
        taleStore.generationInProgress = false
      }
    }
  }
)
</script>
<template>
  <AppHeader />
  <div class="container content">
    <div v-if="taleStore.isTaleRequestFailed || imagesStore.isImagesRequestFailed">
      <div v-if="taleStore.isTaleRequestFailed">
        <AlertToast
          :title="constants.networkErrorTitle"
          :text="constants.networkErrorMessage"
          variant="error"
        />
      </div>
      <div v-else>
        <AlertToast
          :title="constants.networkErrorTitle"
          :text="constants.imageRequestErrorMessage"
          variant="error"
        />
      </div>
    </div>
    <div v-else>
      <v-card
        v-if="taleStore.generationInProgress"
        loading
        :text="!taleStore.tale ? constants.taleIsLoadingText : constants.imageIsLoadingText"
        variant="tonal"
      ></v-card>
      <v-card
        v-else-if="imagesRegenerating"
        loading
        :text="constants.imageIsLoadingText"
        variant="tonal"
      ></v-card>
      <div v-else-if="pagesStore.pages && pagesStore.pages.length > 0">
        <CarouselComponent v-slot="{ currentSlide }">
          <CarouselSlide v-for="(page, i) in pagesStore.pages" :key="i">
            <div v-show="i === currentSlide">
              <img v-if="i === 1 || i === 3" :src="page" width="100%" alt="alt" />
              <div v-else :class="{ title: i === 0 }">{{ page }}</div>
            </div>
          </CarouselSlide>
        </CarouselComponent>
      </div>
      <div v-else>
        <p class="fallback-msg" data-test="fallback-msg">There is nothing to show.</p>
        <p class="link" data-test="home-link" @click="router.push('/')" @keyup="router.push('/')">
          Home
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped>
img {
  border-top-right-radius: 15%;
  border-bottom-right-radius: 15%;
}
.title {
  font-size: 1.3rem;
}
.fallback-msg {
  font-size: 3rem;
}
.link {
  font-size: 1.5rem;
}
@media (width >= 768px) {
  .content {
    width: 650px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
