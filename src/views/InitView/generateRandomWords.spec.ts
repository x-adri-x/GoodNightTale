import { vi, expect, it } from 'vitest'
import { generateRandomWords } from './utils'

vi.mock('random-words', () => ({
  generate: vi.fn(() => ['foo', 'bar', 'baz'])
}))

it('should generate random words', () => {
  const randomWords = generateRandomWords()
  expect(randomWords).toHaveLength(3)
  expect(randomWords).toEqual(['foo', 'bar', 'baz'])
})
