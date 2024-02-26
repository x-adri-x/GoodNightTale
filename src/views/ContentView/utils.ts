import OpenAI from 'openai'
import constants from '@/constants/constants'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_API_KEY,
  dangerouslyAllowBrowser: true
})

export const compareCreatedAt = () => {
  const createdAt = localStorage.getItem(constants.createdAtStorageKey)
  let minutesPassed = 0
  if (createdAt) {
    minutesPassed = Math.floor((Date.now() - parseInt(createdAt, 10)) / 1000 / 60)
  }
  return minutesPassed > parseInt(constants.dallEImageValidTime, 10)
}

export const callDallE = async (prompt: string) => {
  let response
  try {
    response = openai.images.generate({
      model: constants.imageModel,
      prompt,
      n: parseInt(constants.numberOfImages, 10),
      size: '1024x1024'
    })
  } catch (error) {
    throw new Error(`Something went wrong while generating the images: ${error}`)
  }

  return response
}

export const generateImages = (prompts: string[]) => {
  const promises: Promise<OpenAI.ImagesResponse | undefined>[] = []
  prompts.forEach(async (prompt: string) => {
    promises.push(Promise.resolve(callDallE(prompt)))
  })
  return Promise.all(promises)
}

export const createPages = (text: string[], images: (string | undefined)[]): string[] => {
  const tmp = text
  const title = text[0].split(': ')[1]
  tmp.splice(0, 1, title)
  constants.imageIndexes.split(',').forEach((index, i) => {
    tmp.splice(parseInt(index, 10), 0, images[i]!)
  })
  return tmp
}
export const addNewImages = (text: string[], images: (string | undefined)[]): string[] => {
  const tmp = text
  constants.imageIndexes.split(',').forEach((index, i) => {
    tmp.splice(parseInt(index, 10), 1, images[i]!)
  })
  return tmp
}
