import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import constants from '@/constants/constants'

const useImagesStore = defineStore('image', () => {
  const imageUrls: Ref<Array<string | undefined>> = ref([])
  const created: number = Date.now()
  const isImagesRequestFailed = ref(false)

  function saveCreatedToLocalStorage() {
    localStorage.setItem(constants.createdAtStorageKey, JSON.stringify(created))
  }

  function $reset() {
    isImagesRequestFailed.value = false
  }

  return {
    imageUrls,
    $reset,
    isImagesRequestFailed,
    created,
    saveCreatedToLocalStorage
  }
})

export default useImagesStore
