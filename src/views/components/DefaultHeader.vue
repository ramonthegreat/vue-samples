<template>
    <header class="blog-header lh-1 py-3">
        <div class="row flex-nowrap justify-content-between align-items-center">
            <div class="col-4 pt-1">
                <nav class="nav d-flex justify-content-start">
                    <router-link :to="{name: 'Profile'}" class="p-2 link-secondary" href="#">Profile</router-link>
                    <router-link :to="{name: 'UserList'}" class="p-2 link-secondary" href="#">Users</router-link>
                    <router-link :to="{name: 'PokemonList'}" class="p-2 link-secondary" href="#">Pokemons</router-link>
                </nav>
            </div>
            <div class="col-4 text-center">
                <a class="blog-header-logo text-dark" href="#">GoTo Pokemon</a>
            </div>
            <div class="col-4 d-flex justify-content-end align-items-center">
                <a class="btn btn-sm btn-outline-secondary" @click="handleLogout">Sign out</a>
            </div>
        </div>
    </header>
</template>

<script setup>
import { useAuth } from "@/composables/auth";
import { useRouter } from "vue-router";
const { logout } = useAuth()
const router = useRouter();

function handleLogout() {
	logout().then(() => {
		router.push({ name: 'Login' })
  });
}
</script>

<style scoped>

</style>
