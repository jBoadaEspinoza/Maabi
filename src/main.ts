import './assets/css/satoshi.css'
import './assets/css/style.css'
import 'jsvectormap/dist/css/jsvectormap.min.css'
import 'flatpickr/dist/flatpickr.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'
import PrimeVue from 'primevue/config'



import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(PrimeVue, {
    unstyled: true // Enable unstyled mode
})

app.use(createPinia())
app.use(router)
app.use(VueApexCharts)

app.mount('#app')
