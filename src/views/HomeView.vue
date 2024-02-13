<script setup lang="ts">
import { useRouter } from 'vue-router'
import ButtonPrimary from '@/components/ButtonPrimary.vue'

const router = useRouter()
</script>

<template>
  <div class="main-container">
    <h1>The Good Night Tale</h1>
    <ButtonPrimary
      text="Tell me a tale!"
      @click="router.push('/init')"
    />
  </div>
</template>
