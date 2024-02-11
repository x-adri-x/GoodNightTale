<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <v-btn variant="tonal">{{ text }}</v-btn>
</template>
