<script setup lang="ts">
import { ref, watch } from 'vue'
import useGoodNightTaleStore from '@/stores/goodnighttale'
import ErrorToast from '@/components/ErrorToast.vue'
import constants from '@/constants/constants.ts'

const taleStore = useGoodNightTaleStore()
taleStore.getFromLocalStorage()
const loading = ref(true)
watch(
  () => taleStore.tale,
  () => {
    if (taleStore.tale || taleStore.isFailed) {
      loading.value = false
    }
  },
  { immediate: true }
)
</script>
<template>
  <div>
    <ErrorToast
      v-if="taleStore.isFailed"
      :title="constants.networkErrorTitle"
      :text="constants.networkErrorMessage"
    />
  </div>
  <div>
    <v-card
      v-if="!taleStore.isFailed"
      :loading="loading"
      :text="taleStore.tale"
      variant="tonal"
    ></v-card>
  </div>
</template>
