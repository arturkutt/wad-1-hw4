<template>
  <div id="app">
    <header class="site-header">
      <nav class="nav-bar">
        <router-link to="/home" v-if="isLogged" class="nav-link">Home</router-link>
        <router-link to="/add-post" v-if="isLogged" class="nav-link">Add Post</router-link>
        <router-link to="/contact" class="nav-link">Contact</router-link>
        <div class="right">
          <button v-if="isLogged" @click="logout" class="btn">Logout</button>
          <router-link v-else to="/login" class="nav-link">Login</router-link>
        </div>
      </nav>
    </header>

    <main class="content">
      <router-view />
    </main>

    <footer class="site-footer">
      <p>WAD HW4 – Frontend</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isLogged() {
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      // remove axios header
      const api = require('./services/api').default;
      api.setToken(null);
      this.$router.push('/login');
    }
  }
};
</script>

<style>
/* small local adjustments if needed, global styles are in assets/main.css */
.right { margin-left: auto; }
</style>
