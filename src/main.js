import './assets/main.css'

import {createApp} from 'vue';
import Root from './Root.vue';
import {createPinia} from 'pinia';
import router from './router/router.js';

const piniaPlugin = createPinia();

createApp(Root).use(piniaPlugin).use(router).mount('#root');
