import { expect, it } from 'vitest'
import { extractPromptsForImages } from './utils'

it('extracts url-s from image request response', () => {
  const response =
    'prompt1: Sollicitudin tempor id eu nisl nunc mi ipsum.\nprompt2: At tellus at urna condimentum mattis.'
  const prompts = extractPromptsForImages(response)
  expect(prompts).toHaveLength(2)
  expect(prompts).toStrictEqual([
    'Sollicitudin tempor id eu nisl nunc mi ipsum.',
    'At tellus at urna condimentum mattis.'
  ])
})
