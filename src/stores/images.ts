import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import constants from '@/constants/constants'

const useImagesStore = defineStore('image', () => {
  const imageUrls: Ref<Array<string | undefined>> = ref([])
  const isFailed = ref(false)

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
    isFailed,
    saveImagesToLocalStorage,
    getImagesFromLocalStorage
  }
})

export default useImagesStore
