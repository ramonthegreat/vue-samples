<template>
    <div class="container" v-if="userObj.users.value.length">
        <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(user, idx) in userObj.users.value" :key="idx">
                <th scope="row">{{ idx + 1}}</th>
                <td>{{ user.first_name }} {{ user.last_name }}</td>
                <td class="text-end">
                    <router-link :to="{name: 'UserDetails', params: {id: user.id}}" class="btn btn-primary">View</router-link>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import {useUser} from "@/composables/user";
import {onMounted} from "vue";
const userObj = useUser()

onMounted(() => userObj.getUsers({}))
</script>