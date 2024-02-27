<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import ButtonPrimary from '@/components/ButtonPrimary.vue'

const router = useRouter()
const mobileView = ref(window.innerWidth < 768)
</script>

<template>
  <div class="container home">
    <div class="headings">
      <h1>Good Night Tale App</h1>
      <h3 v-show="!mobileView">Generate a cute tale for your little one <br />with OpenAI.</h3>
    </div>
    <ButtonPrimary class="btn" text="Tell me a tale!" @click="router.push('/init')" />
  </div>
</template>
<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-image: url('../assets/kenrick-mills.jpeg');
  background-size: cover;
}

.headings {
  margin-top: 30vh;
}

h1 {
  font-size: 5rem;
  color: #515151;
}

.btn {
  width: 80vw;
  height: 50px;
  margin-top: auto;
  color: blanchedalmond;
}
@media (width >= 768px) {
  .home {
    display: grid;
    grid-template-areas:
      'heading'
      'button';
    width: 100%;
    justify-content: center;
  }
  .btn {
    grid-area: button;
    background-color: #f27f60;
    width: 100%;
    height: 80px;
    margin: 5vh 0px;
    color: var(--vt-c-black-soft);
    font-weight: 700;
  }
  h1 {
    grid-area: heading;
    font-size: 3rem;
    justify-self: flex-start;
    margin-bottom: 0px;
    text-align: left;
    margin-top: 2vh;
    letter-spacing: 2px;
  }
}

@media (width >= 1055px) {
  .home {
    align-items: flex-start;
  }
  h1 {
    margin-top: 10vh;
  }
  .btn {
    margin-bottom: 40vh;
  }
}
</style>
