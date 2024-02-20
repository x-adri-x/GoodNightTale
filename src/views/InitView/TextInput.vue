<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  isDisabled: {
    type: Boolean,
    required: false
  }
})
</script>
<template>
  <v-text-field label="Keyword" :disabled="isDisabled"></v-text-field>
</template>
