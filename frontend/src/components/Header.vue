<template>
  <header class="site-header">
    <nav class="nav-bar">
      <router-link to="/home" class="nav-link" v-if="isLogged">Home</router-link>
      <router-link to="/add-post" class="nav-link" v-if="isLogged">Add Post</router-link>
      <router-link to="/contact" class="nav-link">Contact</router-link>

      <!-- emitime logout sündmuse App.vue-le -->
      <div class="right">
        <button v-if="isLogged" @click="$emit('logout')" class="btn">Logout</button>
        <router-link v-else to="/login" class="nav-link">Login</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  computed: {
    isLogged() {
      return !!localStorage.getItem('token');
    }
  }
};
</script>

<style scoped>
.site-header {
  background: #2b6cb0;
  color: white;
  padding: 10px 16px;
}
.nav-bar {
  display: flex;
  align-items: center;
  gap: 12px;
}
.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 600;
}
.right { margin-left: auto; }
.btn {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}
</style>
