<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import OpenAI from 'openai'

import TextInput from './TextInput.vue'
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import constants from '@/constants/constants.ts'
import createPromptMessage from './utils'
import useGoodNightTaleStore from '@/stores/goodnighttale'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_API_KEY,
  dangerouslyAllowBrowser: true
})
const taleStore = useGoodNightTaleStore()
const router = useRouter()
const keyword = ref('')
const keywords: Ref<string[]> = ref([])
const handleClick = () => {
  keywords.value.push(keyword.value)
}

const callChatGPT = async () => {
  router.push('/content')
  let completion
  try {
    completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: constants.prompt
        },
        {
          role: 'user',
          content: createPromptMessage(keywords.value)
        }
      ],
      model: 'gpt-3.5-turbo'
    })
    if (completion.choices[0].message.content) {
      taleStore.tale = completion.choices[0].message.content
      taleStore.saveToLocalStorage()
    }
  } catch {
    taleStore.isFailed = true
  }

  // console.log(completion.choices[0].message)
}
</script>
<template>
  <div>
    <h1>Let's get started!</h1>
    <TextInput v-model="keyword" />
    <ButtonPrimary text="Add keyword" @click="handleClick" />
    <ButtonPrimary text="Generate Tale" @click="callChatGPT" />
  </div>
</template>

<style></style>
