import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import constants from '@/constants/constants'

const useGoodNightTaleStore = defineStore('tale', () => {
  const tale: Ref<string | null | undefined> = ref('')
  const isFailed = ref(false)

  function saveTaleToLocalStorage() {
    localStorage.setItem(constants.taleStorageKey, JSON.stringify(tale.value))
  }

  function getTaleFromLocalStorage() {
    const taleFromLocalStorage = localStorage.getItem(constants.taleStorageKey)
    if (taleFromLocalStorage !== null) {
      tale.value = JSON.parse(taleFromLocalStorage)
    }
  }

  function clearLocalStorage() {
    localStorage.setItem(constants.taleStorageKey, JSON.stringify(''))
  }

  clearLocalStorage()

  return {
    tale,
    isFailed,
    saveTaleToLocalStorage,
    getTaleFromLocalStorage
  }
})

export default useGoodNightTaleStore
