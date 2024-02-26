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

  function $reset() {
    stream.value = [
      {
        role: 'system',
        content: constants.chatGPTPrompt
      }
    ]
  }

  function updatePrompt(message: OpenAI.Chat.Completions.ChatCompletionMessageParam) {
    stream.value.push(message)
  }

  function saveImagesPromptsToLocalStorage() {
    localStorage.setItem(constants.imagesStorageKey, JSON.stringify(imagesPrompts.value))
  }

  $reset()

  return {
    stream,
    $reset,
    imagesPrompts,
    updatePrompt,
    saveImagesPromptsToLocalStorage
  }
})

export default usePromptsStore
