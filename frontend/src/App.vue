<template>
  <div id="app">
    <!-- kui tahad, et header kaoks siis kui pole logged in, jäta v-if alles -->
    <AppHeader :isLogged="isLogged" @logout="logout" />

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
  components: { AppHeader, AppFooter },

  data() {
    return {
      token: localStorage.getItem("token") || ""
    };
  },
  computed: {
    isLogged() {
      return !!this.token;
    }
  },
  mounted() {
    window.addEventListener("auth-changed", this.syncToken);
    window.addEventListener("storage", this.syncToken);
    this.syncToken();
  },
  beforeUnmount() {
    window.removeEventListener("auth-changed", this.syncToken);
    window.removeEventListener("storage", this.syncToken);
  },
  methods: {
    syncToken() {
      this.token = localStorage.getItem("token") || "";
      api.setToken(this.token || null);
    },
    logout() {
      localStorage.removeItem("token");
      api.setToken(null);
      this.syncToken();
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
