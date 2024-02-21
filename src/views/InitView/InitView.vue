<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { mdiCheckCircle } from '@mdi/js'
import TextInput from './TextInput.vue'
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import AlertToast from '@/components/AlertToast.vue'
import constants from '@/constants/constants.ts'
import { callChatGPT, extractPromptsForImages, generateRandomWords } from './utils'
import useGoodNightTaleStore from '@/stores/goodnighttale'
import usePromptsStore from '@/stores/prompts'
import usePagesStore from '@/stores/pages'

const taleStore = useGoodNightTaleStore()
const promptStore = usePromptsStore()
const pagesStore = usePagesStore()
const router = useRouter()
const keyword = ref('')
const keywords: Ref<string[]> = ref([])
const showWarning = ref(false)
const randomWords = ref(generateRandomWords())

pagesStore.clearLocalStorage()

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
  if (!keywords.value.includes(keyword.value)) {
    keywords.value.push(keyword.value)
    keyword.value = ''
    showWarning.value = false
  } else {
    showWarning.value = true
  }
}

const handleChipClose = (text: string) => {
  keywords.value = keywords.value.filter((k) => k !== text)
}

const generateTale = async () => {
  router.push('/content')
  promptStore.updatePrompt({
    role: 'user',
    content: `The ${keywords.value.length} words are: ${keywords.value.slice(0).join(', ')}.`
  })
  const response = await callChatGPT(promptStore.stream)
  const tale = await response?.choices[0].message.content

  taleStore.tale = tale
  taleStore.saveTaleToLocalStorage()
  promptStore.updatePrompt({ role: 'assistant', content: tale })
}

const selectRandomWord = (word: string) => {
  if (!keywords.value.includes(word)) {
    keywords.value.push(word)
    showWarning.value = false
  } else {
    showWarning.value = true
  }
}
</script>
<template>
  <div>
    <h1>Let's get started!</h1>
    <TextInput v-model="keyword" @keyup.enter="handleClick" :isDisabled="keywords.length === 5" />
    <AlertToast :text="constants.inputInfoMessage" variant="info"></AlertToast>
    <AlertToast
      v-if="showWarning"
      :text="constants.duplicateWordWarning"
      variant="warning"
    ></AlertToast>
    <v-chip
      v-for="keyword in keywords"
      :key="keyword"
      closable
      @click:close="handleChipClose(keyword)"
      >{{ keyword }}</v-chip
    >
    <v-chip
      v-for="(word, index) in randomWords"
      :key="index"
      :prepend-icon="keywords.includes(word) ? mdiCheckCircle : undefined"
      @click="selectRandomWord(word)"
      >{{ word }}</v-chip
    >
    <ButtonPrimary text="Generate Tale" :isDisabled="keywords.length < 5" @click="generateTale" />
  </div>
</template>

<style></style>
