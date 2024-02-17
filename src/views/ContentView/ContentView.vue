<script setup lang="ts">
import { ref, watch } from 'vue'
import OpenAI from 'openai'
import useGoodNightTaleStore from '@/stores/goodnighttale'
import ErrorToast from '@/components/ErrorToast.vue'
import constants from '@/constants/constants.ts'
import useImagesStore from '@/stores/images'
import usePromptsStore from '@/stores/prompts'

const taleStore = useGoodNightTaleStore()
const imagesStore = useImagesStore()
const promptStore = usePromptsStore()
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_API_KEY,
  dangerouslyAllowBrowser: true
})
taleStore.getTaleFromLocalStorage()
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
    taleStore.isFailed = true
  }

  return response
}

watch(
  () => taleStore.tale,
  () => {
    if (taleStore.tale || taleStore.isFailed) {
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
</script>
<template>
  <div>
    <ErrorToast
      v-if="taleStore.isFailed"
      :title="constants.networkErrorTitle"
      :text="constants.networkErrorMessage"
    />
  </div>
  <div>
    <v-card
      v-if="!taleStore.isFailed"
      :loading="loading"
      :text="taleStore.tale as string"
      variant="tonal"
    ></v-card>
  </div>
</template>
