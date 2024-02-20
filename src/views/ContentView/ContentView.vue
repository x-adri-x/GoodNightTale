<script setup lang="ts">
import { ref, watch } from 'vue'
import OpenAI from 'openai'
import useGoodNightTaleStore from '@/stores/goodnighttale'
import ErrorToast from '@/components/ErrorToast.vue'
import PageSwiper from './PageSwiper.vue'
import constants from '@/constants/constants.ts'
import useImagesStore from '@/stores/images'
import usePromptsStore from '@/stores/prompts'
import usePagesStore from '@/stores/pages'

const taleStore = useGoodNightTaleStore()
const imagesStore = useImagesStore()
const promptStore = usePromptsStore()
const pagesStore = usePagesStore()
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_API_KEY,
  dangerouslyAllowBrowser: true
})
pagesStore.getPagesFromLocalStorage()
const loading = ref(true)

const callDallE = async (prompt: string) => {
  let response
  try {
    response = openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024'
    })
  } catch {
    imagesStore.isImageRequestFailed = true
  }

  return response
}

watch(
  () => taleStore.tale,
  () => {
    if (taleStore.tale || taleStore.isTaleRequestFailed) {
      loading.value = false
    }
  },
  { immediate: true }
)
watch(
  () => promptStore.imagesPrompts,
  () => {
    promptStore.imagesPrompts.forEach(async (prompt: string) => {
      const completion = await callDallE(prompt)
      const url = await completion?.data[0].url
      imagesStore.imageUrls.push(url)
    })
  }
)
imagesStore.$subscribe(async () => {
  if (imagesStore.imageUrls.length === 2) {
    pagesStore.$reset()
    const parts = taleStore.tale?.split('\n\n')
    if (parts) {
      pagesStore.pages.push(parts[0].split(': ')[1])
      pagesStore.pages.push(imagesStore.imageUrls[0])
      pagesStore.pages.push(parts[1])
      pagesStore.pages.push(imagesStore.imageUrls[1])
      pagesStore.pages.push(parts[2])
      pagesStore.pages.push(parts[3])
    }
    pagesStore.savePagesToLocalStorage()
  }
})
</script>
<template>
  <div>
    <ErrorToast
      v-if="taleStore.isTaleRequestFailed"
      :title="constants.networkErrorTitle"
      :text="constants.networkErrorMessage"
    />
  </div>
  <div>
    <v-card
      v-if="pagesStore.pages.length === 0"
      :loading="loading"
      :text="!taleStore.tale ? constants.taleIsLoadingText : constants.imageIsLoadingText"
      variant="tonal"
    ></v-card>
    <PageSwiper
      v-if="pagesStore.pages && pagesStore.pages.length > 0"
      :slides="pagesStore.pages"
    ></PageSwiper>
  </div>
</template>
