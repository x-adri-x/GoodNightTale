import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import constants from '@/constants/constants'

const useImagesStore = defineStore('image', () => {
  const imageUrls: Ref<Array<string | undefined>> = ref([])
  const isImageRequestFailed = ref(false)
  const created: number = Date.now()

  function saveCreatedToLocalStorage() {
    localStorage.setItem(constants.createdAtStorageKey, JSON.stringify(created))
  }

  function saveImagesToLocalStorage() {
    localStorage.setItem(constants.imagesStorageKey, JSON.stringify(imageUrls.value))
  }

  function getImagesFromLocalStorage() {
    const imagesFromLocalStorage = localStorage.getItem(constants.imagesStorageKey)
    if (imagesFromLocalStorage) {
      imageUrls.value = JSON.parse(imagesFromLocalStorage)
    }
  }

  function clearLocalStorage() {
    localStorage.setItem(constants.iamgesStorageKey, JSON.stringify([]))
  }

  clearLocalStorage()

  return {
    imageUrls,
    created,
    isImageRequestFailed,
    saveImagesToLocalStorage,
    saveCreatedToLocalStorage,
    getImagesFromLocalStorage
  }
})

export default useImagesStore
