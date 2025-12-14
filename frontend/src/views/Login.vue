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

    <div v-if="message" class="error-box" role="alert">
      {{ message }}
    </div>
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
      this.message = "";
      try {
        const res = await api.auth.login({ email: this.email, password: this.password });
        const token = res.data.token;
        localStorage.setItem('token', token);
        window.dispatchEvent(new Event("auth-changed"));
        api.setToken(token);
        this.$router.push('/home');
      } catch (err) {
        const status = err?.response?.status;
        const backendMsg = err?.response?.data?.error || err?.response?.data?.message;

        if (status === 401 || status === 403) {
          this.message = "Incorrect login info.";
        } else {
          this.message = backendMsg || "Login failed";
        }
      }
    }
  }
};
</script>

<style scoped>
  .error-box {
    margin-top: 16px;
    padding: 10px 14px;
    border: 1px solid #f5a3a3;
    background: #ffe5e5;
    color: #b00020;
    border-radius: 6px;
    display: block;
  }
  </style>

