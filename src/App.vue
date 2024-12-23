<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import Toaster from "./components/ui/toast/Toaster.vue";

</script>

<template>
  <Toaster />
  <Navbar />
  <router-view></router-view>
  <Footer />
</template>
