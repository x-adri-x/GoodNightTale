import { expect, it } from 'vitest'
import { createPages } from './utils'

it('should generate a new array out of two arrays', () => {
  const text = ['Title: foo', 'bar', 'baz']
  const images = ['foobar', 'foobarbaz']
  expect(createPages(text, images)).toStrictEqual(['foo', 'foobar', 'bar', 'foobarbaz', 'baz'])
})
