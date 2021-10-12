import { createApp } from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import App from '@/App.vue'
import router from '@/router'
import authStore, { authStoreKey } from '@/store/auth'
import './index.css'

import config from '@/firebase-config.json'

firebase.initializeApp(config)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

const app = createApp(App)
app.use(router)
app.provide(authStoreKey, authStore())
app.mount('#app')
