import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia'
import { router } from './route';

import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

import './style.css'; // Tailwind, etc.

// Instância do TanStack Query (vue-query)
const queryClient = new QueryClient();

const app = createApp(App);


app.use(router);
app.use(VueQueryPlugin, { queryClient });
app.use(createPinia())

app.mount('#app');

