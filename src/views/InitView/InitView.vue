<script setup lang="ts">
import { ref, type Ref } from 'vue'
import OpenAI from 'openai'

import TextInput from './TextInput.vue'
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import constants from '@/constants/constants.ts'
import createPromptMessage from './utils'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_API_KEY,
  dangerouslyAllowBrowser: true
})

const keyword = ref('')
const keywords: Ref<string[]> = ref([])
const handleClick = () => {
  keywords.value.push(keyword.value)
  console.log(keywords.value)
}

const callChatGPT = async () => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: constants.prompt
      },
      { role: 'user', content: createPromptMessage(keywords.value) }
    ],
    model: 'gpt-3.5-turbo'
  })

  console.log(completion.choices[0].message)
}
</script>
<template>
  <div>
    <h1>Let's get started!</h1>
    <TextInput v-model="keyword" />
    <ButtonPrimary text="Add keyword" @click="handleClick" />
    <ButtonPrimary text="Test GPT prompt" @click="callChatGPT" />
  </div>
</template>

<style></style>
