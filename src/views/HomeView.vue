<script setup lang="ts">
import { useRouter } from 'vue-router'
import ButtonPrimary from '@/components/ButtonPrimary.vue'

const router = useRouter()
</script>

<template>
  <div class="container">
    <h1>The Good Night Tale</h1>
    <img src="../assets/logo.png" alt="logo" width="200px" />
    <ButtonPrimary class="btn" text="Tell me a tale!" @click="router.push('/init')" />
  </div>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  height: 70vh;
}

.btn {
  margin-top: auto;
}
</style>
