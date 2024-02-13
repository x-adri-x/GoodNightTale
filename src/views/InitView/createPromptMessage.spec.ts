import { expect, it } from 'vitest'
import createPromptMessage from './utils'

it('creates a chatGPT prompt message from keywords', () => {
  const keywords = [
    'foo',
    'bar',
    'baz',
    'foobar',
    'foobarbaz'
  ]
  const message = createPromptMessage(keywords)
  expect(message).toBe(
    `The 5 words are: foo, bar, baz, foobar, foobarbaz.`
  )
})
