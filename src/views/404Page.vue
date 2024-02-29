<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<template>
  <div class="container">
    <p class="fallback-msg" data-test="fallback-msg">Looks like you got lost.</p>
    <p class="link" data-test="home-link" @click="router.push('/')" @keyup="router.push('/')">
      Go Back Home
    </p>
  </div>
</template>
