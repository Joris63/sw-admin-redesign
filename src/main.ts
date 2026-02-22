import { createApp } from 'vue';
import './assets/style.css';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import MyTheme from './theme';
import router from './router';

const app = createApp(App);
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: MyTheme,
    options: {
      darkModeSelector: false,
    },
  },
});
app.mount('#app');
