<template>
    <main class="container">
        <h2 class="text-center">Signup Form</h2>
        <div class="row g-5">
            <div class="col-lg-8 offset-lg-2">
                <h4 class="mb-3">Profile</h4>
                <div class="text-danger text-start" v-if="serverErrors.length">
                    <ul>
                        <li v-for="(error, i) in serverErrors" :key="i">
                            {{ error }}
                        </li>
                    </ul>
                </div>
                <AccountForm @submitForm="handleSubmit" :isRegistration="true" />

                <p class="my-4 text-center">OR</p>

                <router-link :to="{name: 'Login'}" class="w-100 btn btn-lg btn-primary" type="button">Login</router-link>
            </div>
        </div>
    </main>
</template>

<script setup>
import AccountForm from "@/views/components/forms/AccountForm.vue";
import { useAuth } from "@/composables/auth";
import { useRouter } from "vue-router";
import {ref} from "vue";
const { register } = useAuth()
const router = useRouter()
const serverErrors = ref([])

function handleSubmit(formState) {
	register(formState.value).then(() => {
		router.push({ name: 'Profile' })
	}).catch(({response}) => {
		serverErrors.value = response.data.errors || []
	})
}

</script>