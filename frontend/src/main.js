import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';
import api from './services/api';

const app = createApp(App);

// If token already in localStorage, set axios default header
const token = localStorage.getItem('token');
if (token) {
  api.setToken(token);
}

app.use(router);
app.mount('#app');
