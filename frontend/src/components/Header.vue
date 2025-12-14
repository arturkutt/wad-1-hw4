<template>
  <header class="site-header">
    <nav class="nav-bar">
      <router-link to="/home" class="nav-link" v-if="isLogged">Home</router-link>
      <!--<router-link to="/add-post" class="nav-link" v-if="isLogged">Add Post</router-link>-->
      <router-link to="/contact" class="nav-link">Contact</router-link>

      <!-- emitime logout sündmuse App.vue-le -->
      <div class="right">
        <button v-if="isLogged" @click="$emit('logout')" class="btn danger">Logout</button>
        <router-link v-else to="/login" class="nav-link">Login</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
  export default {
    name: "AppHeader",
    props: {
      isLogged: {
        type: Boolean,
        required: true
      }
    }
  };
  </script>

