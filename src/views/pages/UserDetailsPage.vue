<template>
    <div class="container">
        <div class="row" v-if="user">
            <div class="col-md-6">
                <div class="card mb-2">
                    <div class="card-header">
                        Profile
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Name: {{ user.first_name }} {{ user.last_name }}</li>
                        <li class="list-group-item">Username: {{ user.username }}</li>
                        <li class="list-group-item">Email: {{ user.email }}</li>
                        <li class="list-group-item">Birthdate: {{ user.birthday }}</li>
                    </ul>
                </div>
                <div class="card mb-2" v-if="favorites.length">
                    <div class="card-header">
                        Favorites
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" v-for="(poke, idx) in favorites" :key="idx">{{ poke }}</li>
                    </ul>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card mb-2" v-if="likes.length">
                    <div class="card-header">
                        Likes
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" v-for="(poke, idx) in likes" :key="idx">{{ poke }}</li>
                    </ul>
                </div>

                <div class="card mb-2" v-if="hates.length">
                    <div class="card-header">
                        Hates
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" v-for="(poke, idx) in hates" :key="idx">{{ poke }}</li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {useUser} from "@/composables/user";
import {onMounted, ref} from "vue";
const userObj = useUser()
const user = ref(null);
const favorites = ref([])
const likes = ref([])
const hates = ref([])
onMounted(() => {
	const route = useRoute()
	const userId = route.params.id
	userObj.getUser(userId).then(({data}) => {
		user.value = data.user

    for (const poke of user.value.pokemons) {
			switch (poke.type) {
        case 'favorite':
					favorites.value.push(poke.pokemon)
          break
				case 'like':
					likes.value.push(poke.pokemon)
					break
				case 'hate':
					hates.value.push(poke.pokemon)
					break
      }
    }
  });
})

</script>