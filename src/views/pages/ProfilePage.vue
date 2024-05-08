<template>
    <main class="container">
        <h2 class="text-center">My Profile</h2>
        <div class="row g-5">
            <div class="col-md-6">
                <h4 class="mb-3">Profile</h4>
                <div class="text-danger text-start" v-if="serverErrors.length">
                    <ul>
                        <li v-for="(error, i) in serverErrors" :key="i">
                            {{ error }}
                        </li>
                    </ul>
                </div>
                <AccountForm @submitForm="handleSubmit" :isRegistration="false" :formData="user" />
            </div>
            <div class="col-md-6">
                <div class="card mb-2" v-if="user.favorites.length">
                    <div class="card-header">
                        Favorites
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" v-for="(poke, idx) in user.favorites" :key="idx">{{ poke }}</li>
                    </ul>
                </div>
                <div class="card mb-2" v-if="user.likes.length">
                    <div class="card-header">
                        Likes
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" v-for="(poke, idx) in user.likes" :key="idx">{{ poke }}</li>
                    </ul>
                </div>

                <div class="card mb-2" v-if="user.hates.length">
                    <div class="card-header">
                        Hates
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" v-for="(poke, idx) in user.hates" :key="idx">{{ poke }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import AccountForm from "@/views/components/forms/AccountForm.vue";
import { useUser } from "@/composables/user";
import {onMounted, ref} from "vue";
const { updateProfile, getIdentity } = useUser()
const serverErrors = ref([])
const user = getIdentity()
function handleSubmit(formState) {
	updateProfile(formState.value).then(() => {
		alert('You have successfully updated your profile')
	}).catch(({response}) => {
		serverErrors.value = response.data.errors || []
	})
}

</script>