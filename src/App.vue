<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/PageFooter.vue'

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    
  });
} else {
  console.log("geolocation not permitted")
}
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main class="h-100">
    <RouterView />
  </main>
  <Footer />
</template>

<style scoped>

</style>
