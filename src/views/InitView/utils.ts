export default function createPromptMessage(keywords: string[]): string {
  let message = keywords.slice(0).join(', ')
  message += '.'
  return `The ${keywords.length} words are: ${message}`
}
