<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { mdiCheckCircle } from '@mdi/js'
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import AlertToast from '@/components/AlertToast.vue'
import constants from '@/constants/constants.ts'
import { callChatGPT, generateRandomWords, getRandomWords } from './utils'
import useGoodNightTaleStore from '@/stores/goodnighttale'
import usePromptsStore from '@/stores/prompts'
import usePagesStore from '@/stores/pages'
import useImagesStore from '@/stores/images'

const taleStore = useGoodNightTaleStore()
const promptStore = usePromptsStore()
const pagesStore = usePagesStore()
const imagesStore = useImagesStore()
const router = useRouter()
const keyword: Ref<string> = ref('')
const keywords: Ref<string[]> = ref([])
const showWarning = ref(false)
const randomWords = ref(getRandomWords())

console.log('openai api key', process.env.OPENAI_API_KEY)

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
  taleStore.generationInProgress = true
  promptStore.$reset()
  pagesStore.$reset()
  imagesStore.$reset()
  promptStore.updatePrompt({
    role: 'user',
    content: `The ${keywords.value.length} words are: ${keywords.value.slice(0).join(', ')}.`
  })

  try {
    const response = await callChatGPT(promptStore.stream)
    const tale = await response?.choices[0].message.content
    taleStore.tale = tale
    taleStore.saveTaleToLocalStorage()
  } catch (error) {
    taleStore.isTaleRequestFailed = true
    throw new Error(`An error has occured: ${error}`)
  }
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
  <div class="container">
    <h1 aria-label="Let's get started">Let's get started!</h1>
    <AlertToast
      closable
      :text="constants.inputInfoMessage"
      variant="info"
      data-test="info-toast"
    ></AlertToast>

    <v-text-field
      v-model="keyword"
      theme="primary-darken-1"
      :disabled="keywords.length === 5"
      :rules="[(value) => value.length <= 9]"
      label="Title"
      counter
      maxlength="9"
      @keyup.enter="handleClick"
    ></v-text-field>

    <AlertToast
      v-if="showWarning"
      :text="constants.duplicateWordWarning"
      variant="warning"
    ></AlertToast>
    <div class="random-chip-container">
      <v-chip
        v-for="keyword in keywords"
        :key="keyword"
        class="chip"
        closable
        @click:close="handleChipClose(keyword)"
        >{{ keyword }}</v-chip
      >
    </div>
    <p
      class="link"
      @click="randomWords = generateRandomWords()"
      @keyup="randomWords = generateRandomWords()"
    >
      Regenerate random list
    </p>
    <div class="random-chip-container">
      <v-chip
        v-for="(word, index) in randomWords"
        :key="index"
        class="chip"
        :prepend-icon="keywords.includes(word) ? mdiCheckCircle : undefined"
        @click="selectRandomWord(word)"
        >{{ word }}</v-chip
      >
    </div>
    <ButtonPrimary text="Generate Tale" :isDisabled="keywords.length < 5" @click="generateTale" />
  </div>
</template>

<style scoped>
.random-chip-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 40px 0;
}

.link {
  text-decoration-line: underline;
}
.chip {
  justify-content: center;
}
</style>
