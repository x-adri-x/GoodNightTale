import { vi, expect, it } from 'vitest'
import { getRandomWords } from './utils'
import constants from '@/constants/constants'

vi.mock('random-words', () => ({
  generate: vi.fn(() => ['foo', 'bar', 'baz'])
}))
it('should return random words from localStorage if available', () => {
  localStorage.setItem(constants.randomWordsStorageKey, JSON.stringify(['foo', 'bar']))

  const randomWords = getRandomWords()
  expect(randomWords).toEqual(['foo', 'bar'])
  localStorage.removeItem(constants.randomWordsStorageKey)
})

it('should generate random words if no localStorage', () => {
  const randomWords = getRandomWords()
  expect(randomWords).toHaveLength(3)
  expect(randomWords).toEqual(['foo', 'bar', 'baz'])
})
