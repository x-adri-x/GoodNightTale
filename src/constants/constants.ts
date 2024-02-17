type Constants = {
  [key: string]: string
}

const constants: Constants = {
  model: 'gpt-3.5-turbo',
  chatGPTPrompt:
    'I will provide you with 5 random words, and I would like you to write me ' +
    'a short tale out of those 5 words. It should be no longer than 100 words, ' +
    'and it should be something clever and nice, suitable for small kids to enjoy ' +
    'before bedtime. Give it a fitting title as well.',
  dallEPrompt:
    'Now create two prompts for DALL-E to illustrate your tale.' +
    'Do not use names from your tale in the prompts.' +
    'Your answer should be formatted like: prompt1: the first prompt, prompt2: the second prompt',
  networkErrorTitle: 'Network request error.',
  networkErrorMessage:
    'Something went wrong when trying to generate your tale. Please check your connection and try again.',
  taleStorageKey: 'tale',
  iamgesStorageKey: 'illustration'
}

export default constants
