<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})
</script>
<template>
  <v-alert color="error" icon="$error" :title="title" :text="text"></v-alert>
</template>
