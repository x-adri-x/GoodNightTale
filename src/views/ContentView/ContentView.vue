<script setup lang="ts">
import { ref } from 'vue'

const mock = ref('')
const loading = ref(true)
setTimeout(() => {
  mock.value = `Once upon a time, in a magical forest surrounded by tall trees, there lived a clever little fox named Felix. 
  He had a cozy house made of twigs and leaves, nestled under the protective branches of an ancient oak tree. 
  One clear night, as the moon cast its gentle glow upon the forest, Felix decided to invite his friends over 
  for a special gathering. Felix sent out invitations to all the woodland creatures—squirrels, rabbits, birds, 
  and even a wise old owl. As the guests arrived, they were amazed by the warm atmosphere of Felix's house, 
  adorned with twinkling fireflies and fragrant wildflowers. In the center of the cozy living room, Felix had 
  placed a table covered with a checkered cloth. On the table, there was a platter with a golden wheel of 
  cheese—the most delicious cheese in the entire forest. The aroma wafted through the air, making everyone's 
  mouths water with anticipation. The party began with laughter and games. The animals played hide-and-seek 
  among the trees, their giggles echoing through the night. When they returned to Felix's house, the wise 
  old owl suggested a storytelling contest. Each animal would take turns sharing a tale, and the best 
  storyteller would be rewarded with the coveted golden cheese.`
  loading.value = false
}, 8000)
</script>
<template>
  <div>
    <v-card :loading="loading" :text="mock" variant="tonal"></v-card>
  </div>
</template>
