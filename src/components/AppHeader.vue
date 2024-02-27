<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<template>
  <div class="header" data-test="header">
    <img
      src="../assets/logo.png"
      alt="logo"
      width="50px"
      @click="router.push('/')"
      @keyup="router.push('/')"
    />
    <h2 aria-label="Good night tale" @click="router.push('/')" @keyup="router.push('/')">
      Good Night Tale
    </h2>
  </div>
</template>
<style scoped>
.header {
  align-items: center;
  display: flex;
  width: 100%;
  border-bottom: 1px solid rgb(118, 118, 118);
  padding: 2rem;
}
h2 {
  cursor: pointer;
}
img {
  margin-right: 15px;
  cursor: pointer;
}
</style>
