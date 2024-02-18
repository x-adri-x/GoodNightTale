import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import constants from '@/constants/constants'

const usePagesStore = defineStore('pages', () => {
  const pages: Ref<Array<string | undefined>> = ref([])

  function savePagesToLocalStorage() {
    localStorage.setItem(constants.pagesStorageKey, JSON.stringify(pages.value))
  }

  function $reset() {
    pages.value = []
  }

  function getPagesFromLocalStorage() {
    const pagesFromLocalStorage = localStorage.getItem(constants.pagesStorageKey)
    if (pagesFromLocalStorage !== null) {
      pages.value = JSON.parse(pagesFromLocalStorage)
    }
    return pages.value
  }

  function clearLocalStorage() {
    localStorage.setItem(constants.pagesStorageKey, JSON.stringify(''))
  }

  return {
    $reset,
    pages,
    clearLocalStorage,
    savePagesToLocalStorage,
    getPagesFromLocalStorage
  }
})

export default usePagesStore
