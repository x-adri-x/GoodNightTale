import OpenAI from 'openai'
import { generate } from 'random-words'
import constants from '@/constants/constants.ts'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_API_KEY,
  dangerouslyAllowBrowser: true
})

export const callChatGPT = async (
  messages: OpenAI.Chat.ChatCompletionMessageParam[]
): Promise<OpenAI.Chat.ChatCompletion | undefined> => {
  return openai.chat.completions.create({ messages, model: constants.chatModel })
}

export const extractPromptsForImages = (prompt: string) => {
  let prompts
  if (prompt) {
    prompts = prompt?.split('\n').map((p) => p.split(': ')[1])
  }
  return prompts
}

export const getRandomWords = () => {
  if (localStorage.getItem(constants.randomWordsStorageKey)) {
    return JSON.parse(localStorage.getItem(constants.randomWordsStorageKey)!)
  }
  const randomWords = generate({ exactly: 10, minLength: 3 })
  localStorage.setItem(constants.randomWordsStorageKey, JSON.stringify(randomWords))
  return randomWords
}

export const generateRandomWords = () => {
  const words = generate({ exactly: 10, minLength: 3 })
  localStorage.setItem(constants.randomWordsStorageKey, JSON.stringify(words))
  return words
}
