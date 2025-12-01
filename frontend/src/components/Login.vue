<template>
  <section class="auth-page">
    <h2>Login</h2>
    <form @submit.prevent="onSubmit" class="auth-form">
      <label>
        Email
        <input type="email" v-model="email" required />
      </label>

      <label>
        Password
        <input type="password" v-model="password" required />
      </label>

      <div class="actions">
        <button type="submit" class="btn">Login</button>
        <button type="button" class="btn outline" @click="$router.push('/signup')">Go to Signup</button>
      </div>
    </form>

    <p v-if="message" class="message">{{ message }}</p>
  </section>
</template>

<script>
import api from '../services/api';

export default {
  name: 'LoginPage',
  data() {
    return { email: '', password: '', message: '' };
  },
  methods: {
    async onSubmit() {
      try {
        const res = await api.auth.login({ email: this.email, password: this.password });
        const token = res.data.token;
        localStorage.setItem('token', token);
        api.setToken(token);
        this.$router.push('/home');
      } catch (err) {
        this.message = err.response?.data?.error || 'Login failed';
      }
    }
  }
};
</script>

