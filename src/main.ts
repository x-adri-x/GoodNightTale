import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import PrimeVue from 'primevue/config'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router/index.ts'

const app = createApp(App)
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  theme: {
    defaultTheme: 'dark'
  },
  components,
  directives
})

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(PrimeVue)

app.mount('#app')
