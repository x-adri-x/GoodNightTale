import OpenAI from 'openai'
import constants from '@/constants/constants.ts'
import useGoodNightTaleStore from '@/stores/goodnighttale'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_API_KEY,
  dangerouslyAllowBrowser: true
})
const taleStore = useGoodNightTaleStore()

export function createInitialPromptMessage(keywords: string[]) {
  const stream: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: constants.chatGPTPrompt
    },
    {
      role: 'user',
      content: `The ${keywords.length} words are: ${keywords.slice(0).join(', ')}.`
    }
  ]

  return stream
}

export const callChatGPT = async (
  messages: OpenAI.Chat.ChatCompletionMessageParam[]
): Promise<OpenAI.Chat.ChatCompletion | undefined> => {
  let completion
  try {
    completion = await openai.chat.completions.create({ messages, model: constants.model })
  } catch {
    taleStore.isFailed = true
  }
  return completion
}

export const extractPromptsForImages = (prompt: string) => {
  const prompt1 = prompt?.split('\n')[0].split(': ')[1]
  const prompt2 = prompt?.split('\n')[1].split(': ')[1]
  return [prompt1, prompt2]
}
