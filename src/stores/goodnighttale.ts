import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import constants from '@/constants/constants'

const useGoodNightTaleStore = defineStore('tale', () => {
  const tale: Ref<string | null | undefined> = ref('')
  const isTaleRequestFailed = ref(false)
  const generationInProgress = ref(false)

  function $reset() {
    isTaleRequestFailed.value = false
  }

  function saveTaleToLocalStorage() {
    localStorage.setItem(constants.taleStorageKey, JSON.stringify(tale.value))
  }

  function getTaleFromLocalStorage() {
    const taleFromLocalStorage = localStorage.getItem(constants.taleStorageKey)
    if (taleFromLocalStorage !== null) {
      tale.value = JSON.parse(taleFromLocalStorage)
    }
  }

  $reset()

  return {
    tale,
    $reset,
    generationInProgress,
    isTaleRequestFailed,
    saveTaleToLocalStorage,
    getTaleFromLocalStorage
  }
})

export default useGoodNightTaleStore
