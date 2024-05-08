<template>
    <div class="container" v-if="pokemon.pokemonList.value.length">
      <table class="table">
          <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Pokemon Name</th>
                <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(poke, idx) in pokemon.pokemonList.value" :key="idx">
                <th scope="row">{{ pokemon.pagination.value.current + idx + 1}}</th>
                <td>{{ poke.name }}</td>
                <td class="text-end">
                    <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="checkbox"
                               class="btn-check" :class="poke.name"
                               :name="'favorite_' + poke.name"
                               :id="'favorite_' + poke.name"
                               @change="(event) => handleChange(event, 'favorite', poke.name)"
                               :checked="user.getIdentity().favorites && user.getIdentity().favorites.includes(poke.name)"
                               :disabled="!user.getIdentity().favorites"
                               autocomplete="off">
                        <label class="btn btn-outline-success" :for="'favorite_' + poke.name">Favorite</label>
                        <input type="checkbox"
                               class="btn-check" :class="poke.name"
                               :name="poke.name"
                               :id="'like_' + poke.name"
                               @change="(event) => handleChange(event, 'like', poke.name)"
                               :checked="user.getIdentity().likes && user.getIdentity().likes.includes(poke.name)"
                               :disabled="!user.getIdentity().likes"
                               autocomplete="off">
                        <label class="btn btn-outline-primary" :for="'like_' + poke.name">Like</label>
                        <input type="checkbox"
                               class="btn-check" :class="poke.name"
                               :name="poke.name"
                               :id="'hate_' + poke.name"
                               @change="(event) => handleChange(event, 'hate', poke.name)"
                               :checked="user.getIdentity().hates && user.getIdentity().hates.includes(poke.name)"
                               :disabled="!user.getIdentity().hates"
                               autocomplete="off">
                        <label class="btn btn-outline-danger" :for="'hate_' + poke.name">Hate</label>
                    </div>
                </td>
            </tr>
          </tbody>
      </table>
      <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
              <li class="page-item" :class="{'disabled': pokemon.pagination.value.previous === null}">
                  <a class="page-link" @click.prevent="pokemon.loadPokemonList(pokemon.pagination.value.previous)" href="#">Previous</a>
              </li>
              <li class="page-item" :class="{'disabled': pokemon.pagination.value.next === null}">
                  <a class="page-link" @click.prevent="pokemon.loadPokemonList(pokemon.pagination.value.next)" href="#">Next</a>
              </li>
          </ul>
      </nav>
    </div>
</template>

<script setup>
import { usePokemon } from "@/composables/pokemon";
import {useUser} from "@/composables/user";
import {onMounted} from "vue";
const pokemon = usePokemon()
const user = useUser()

onMounted(() => {
	pokemon.loadPokemonList(pokemon.pagination.value.current)
})

function handleChange(event, type, value) {
	const isChecked = event.target.checked

	if (isChecked) {

		if (type === 'like') {
			if (user.getIdentity().likes && user.getIdentity().likes.length >= 3) {
				event.target.checked = false;
				return alert('You can only like until 3 pokemons')
      }
			//if value exists in hate, delete
      if (user.getIdentity().hates && user.getIdentity().hates.includes(value)) {
				user.removePokemon({pokemon: value, type: 'hate'}).then(() => {
					const elem = document.getElementById('hate_' + event.target.name)
					elem.checked = false
        })
      }
      //uncheck
    } else if (type === 'hate') {
			if (user.getIdentity().hates && user.getIdentity().hates.length >= 3) {
				event.target.checked = false;
				return alert('You can only hate until 3 pokemons')
			}

			if (user.getIdentity().likes && user.getIdentity().likes.includes(value)) {
				user.removePokemon({pokemon: value, type: 'like'}).then(() => {
					const elem = document.getElementById('like_' + event.target.name)
					elem.checked = false
        })
			}
    }
    user.addPokemon({pokemon: value, type: type});
	} else {
		user.removePokemon({pokemon: value, type: type})
	}
}

</script>