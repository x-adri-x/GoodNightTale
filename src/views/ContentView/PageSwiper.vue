<script setup lang="ts">
import { defineProps } from 'vue'
import Carousel from 'primevue/carousel'

defineProps({
  slides: {
    type: Array<string | undefined>,
    required: true
  }
})
</script>
<template>
  <Carousel :value="slides" :show-indicators="false">
    <template #item="slot">
      <div>
        <img v-if="slot.index === 1 || slot.index === 3" :src="slot.data" width="100%" alt="alt" />
        <p v-else>{{ slot.data }}</p>
      </div>
    </template>
  </Carousel>
</template>
