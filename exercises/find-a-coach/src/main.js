// import './assets/main.css'

import { createRouter } from 'vue-router'
import { createStore } from 'vuex'
import routerConfig from './router.js'
import storeConfig from './store.js'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(createRouter(routerConfig))
app.use(createStore(storeConfig))

app.mount('#app')
