<script setup lang="ts">
import { ref, type Ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import TextInput from './TextInput.vue'
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import constants from '@/constants/constants.ts'
import { callChatGPT, extractPromptsForImages } from './utils'
import useGoodNightTaleStore from '@/stores/goodnighttale'
import usePromptsStore from '@/stores/prompts'
import usePagesStore from '@/stores/pages'

const taleStore = useGoodNightTaleStore()
const promptStore = usePromptsStore()
const pagesStore = usePagesStore()
const router = useRouter()
const keyword = ref('')
const keywords: Ref<string[]> = ref([])

pagesStore.clearLocalStorage()
watch(keywords.value, () => {
  promptStore.updatePrompt({
    role: 'user',
    content: `The ${keywords.value.length} words are: ${keywords.value.slice(0).join(', ')}.`
  })
})
taleStore.$subscribe(
  async () => {
    promptStore.updatePrompt({ role: 'user', content: constants.dallEPrompt })
    try {
      const completion = await callChatGPT(promptStore.stream)
      const content = await completion?.choices[0].message.content
      if (content !== undefined && content !== null)
        promptStore.imagesPrompts = extractPromptsForImages(content)
    } catch (error) {
      throw new Error(`Failed to create prompts for DALL-E. ${error}`)
    }
  },
  { detached: true }
)

const handleClick = () => {
  keywords.value.push(keyword.value)
}

const generateTale = async () => {
  router.push('/content')

  const response = await callChatGPT(promptStore.stream)
  const tale = await response?.choices[0].message.content

  taleStore.tale = tale
  taleStore.saveTaleToLocalStorage()
  promptStore.updatePrompt({ role: 'assistant', content: tale })
}
</script>
<template>
  <div>
    <h1>Let's get started!</h1>
    <TextInput v-model="keyword" />
    <ButtonPrimary text="Add keyword" @click="handleClick" />
    <ButtonPrimary text="Generate Tale" @click="generateTale" />
  </div>
</template>

<style></style>
