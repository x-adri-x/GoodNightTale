import { expect, it } from 'vitest'
import { addNewImages } from './utils'

it('should replace image url-s in the string array', () => {
  const text = ['foo', 'bar', 'baz', 'foobar', 'foobarbaz']
  const images = ['image-1', 'image-2']
  expect(addNewImages(text, images)).toStrictEqual([
    'foo',
    'image-1',
    'baz',
    'image-2',
    'foobarbaz'
  ])
})
