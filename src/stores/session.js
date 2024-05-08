import { defineStore } from "pinia";
import { ref } from "vue";

export const useSessionStore = defineStore('session', () => {
	const user = ref({})
	const loggedIn = ref(false)
	const token = ref('')

	const setUser = (value) => {
		user.value = value
	}

	const getUser = () => {
		return user.value
	}

	const setLoggedIn = (value) => {
		loggedIn.value = value
	}

	const getLoggedIn = () => {
		return loggedIn.value
	}

	const setToken = (value) => {
		token.value = value
	}

	const getToken = () => {
		return token.value
	}

	return {
		setUser, getUser,
		setLoggedIn, getLoggedIn,
		setToken, getToken,
		user, loggedIn, token }
}, {persist: true})