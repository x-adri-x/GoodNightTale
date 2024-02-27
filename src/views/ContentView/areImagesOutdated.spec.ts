import { expect, it } from 'vitest'
import { areImagesOutdated } from './utils'
import constants from '@/constants/constants'

it('should return whether generated image url-s are outdated', () => {
  localStorage.removeItem(constants.createdAtStorageKey)
  let createdAt = Date.now() - 2400000
  localStorage.setItem(constants.createdAtStorageKey, JSON.stringify(createdAt))
  let outdated = areImagesOutdated()
  expect(outdated).toEqual(false)
  createdAt = Date.now() - 3600000
  localStorage.setItem(constants.createdAtStorageKey, JSON.stringify(createdAt))
  outdated = areImagesOutdated()
  expect(outdated).toEqual(true)
  localStorage.removeItem(constants.createdAtStorageKey)
})
