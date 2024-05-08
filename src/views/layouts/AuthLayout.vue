<template>
  <router-view />
  <AuthFooter />
</template>

<script setup>
import AuthFooter from "@/views/components/AuthFooter.vue";
console.log('auth layout loaded')
</script>

