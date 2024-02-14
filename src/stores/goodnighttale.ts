import { defineStore } from 'pinia'

const useGoodNightTaleStore = defineStore({
  id: 'tale',
  state: () => ({
    tale: '',
    isFailed: false
  }),
  actions: {
    saveToLocalStorage() {
      localStorage.setItem('tale', JSON.stringify(this.$state.tale))
    },
    getFromLocalStorage() {
      const taleFromLocalStorage = localStorage.getItem('tale')
      if (taleFromLocalStorage !== null) {
        this.tale = JSON.parse(taleFromLocalStorage)
      }
    }
  }
})

export default useGoodNightTaleStore
