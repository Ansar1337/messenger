import './assets/main.css'

import {createApp} from 'vue';
import App from './App.vue';
import {createPinia} from 'pinia';
import router from './router/router.js';

const piniaPlugin = createPinia();

createApp(App).use(piniaPlugin).use(router).mount('#app');
