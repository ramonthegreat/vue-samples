<template>
  <div class="container">
    <DefaultHeader />
    <main class="my-4">
      <router-view />
    </main>
  </div>
  <DefaultFooter />
</template>

<script setup>
import DefaultHeader from "@/views/components/DefaultHeader.vue";
import DefaultFooter from "@/views/components/DefaultFooter.vue";
import { useUser } from "@/composables/user";

const { loadAuthUser } = useUser()
loadAuthUser();

</script>
