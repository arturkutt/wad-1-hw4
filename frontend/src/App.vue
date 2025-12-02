<template>
  <div id="app">
    <!-- Header näidatakse ainult kui kasutaja on sisse logitud -->
    <AppHeader v-if="isLogged" @logout="logout" />

    <main class="content">
      <router-view />
    </main>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "./components/Header.vue";
import AppFooter from "./components/Footer.vue";
import api from "./services/api";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter
  },
  computed: {
    isLogged() {
      return !!localStorage.getItem("token");
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      api.setToken(null);   // eemaldab axios päise
      this.$router.push("/login");
    }
  }
};
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  padding: 20px;
}
</style>
