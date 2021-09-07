<template>
  <div id="app">
    <TheNavbar @sign-out="logout"/>
    <main class="py-4 container">
      <router-view />
    </main>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar.vue";
import axios from 'axios'

export default {
  components: {
    TheNavbar,
  },
  beforeCreate() {
    localStorage.clear()
    this.$router.push('/login')
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/login')
    }
  }
};
</script>
