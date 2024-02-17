import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import OpenAI from 'openai'
import constants from '@/constants/constants'

const usePromptsStore = defineStore('prompt', () => {
  const stream: Ref<OpenAI.Chat.ChatCompletionMessageParam[]> = ref([
    {
      role: 'system',
      content: constants.chatGPTPrompt
    }
  ])
  const imagesPrompts = ref()

  function updatePrompt(message: OpenAI.Chat.Completions.ChatCompletionMessageParam) {
    stream.value.push(message)
  }

  return {
    stream,
    imagesPrompts,
    updatePrompt
  }
})

export default usePromptsStore
