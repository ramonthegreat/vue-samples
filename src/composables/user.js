import userApi from "@/api/user-api";
import { useSessionStore } from "@/stores/session";
import { ref } from "vue";
export function useUser(){
	const sessionStore = useSessionStore()
	const users = ref([])

	function  loadAuthUser() {
		return userApi.loadAuthUser().then(({ data }) => {
			const favorites = []
			const likes = []
			const hates = []
			for (const p of data.user.pokemons) {
				switch (p.type) {
					case 'favorite': favorites.push(p.pokemon); break;
					case 'like': likes.push(p.pokemon); break;
					case 'hate': hates.push(p.pokemon); break;
				}
			}

			sessionStore.setUser({
				first_name: data.user.first_name,
				last_name: data.user.last_name,
				email: data.user.email,
				birthday: data.user.birthday,
				username: data.user.username,
				favorites,
				likes,
				hates
			})
			sessionStore.setLoggedIn(true)
		})
	}

	function updateProfile(payload) {
		return userApi.updateProfile(payload).then(({data}) => {
			sessionStore.setUser({...getIdentity(), ...{
					first_name: data.user.first_name,
					last_name: data.user.last_name,
					email: data.user.email,
					birthday: data.user.birthday,
					username: data.user.username,
				}})
		})
	}

	function getIdentity() {
		const sessionStore = useSessionStore()
		return sessionStore.getUser()
	}

	function addPokemon(payload) {
		return userApi.addPokemon(payload).then(({ data }) => {
			const key = getKeyType(payload.type)
			sessionStore.getUser()[key].push(data.data.pokemon)
		})
	}

	function removePokemon(payload) {
		return userApi.removePokemon(payload).then(({ data }) => {
			const key = getKeyType(payload.type)
			const tempArr = sessionStore.getUser()[key];

			if (data.success) {
				sessionStore.getUser()[key].splice(tempArr.indexOf(payload.pokemon), 1)
			}
		})
	}

	function getKeyType(type) {
		switch (type) {
			case 'favorite': return 'favorites';
			case 'like': return 'likes';
			case 'hate': return 'hates';
		}

		return ''
	}

	function getUsers(payload) {
		return userApi.getUsers(payload).then(({data}) => {
			users.value = data.users
		})
	}

	function getUser(id) {
		return userApi.getUser(id)
	}

	return {
		loadAuthUser,
		getIdentity,
		addPokemon,
		removePokemon,
		getUsers,
		getUser,
		users,
		updateProfile
	}
}
