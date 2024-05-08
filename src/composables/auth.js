import authApi from "@/api/auth-api";
import { useSessionStore } from "@/stores/session";

export function useAuth () {
	const REFRESH_TOKEN_KEY = 'rtk'
	const login = (data) => {
		return authApi.login(data).then(loginCallback)
	}

	const logout = () => {
		const sessionStore = useSessionStore()
		return authApi.logout().then(() => {
			sessionStore.setUser({})
			sessionStore.setLoggedIn(false)
			sessionStore.setToken('')

			localStorage.removeItem(REFRESH_TOKEN_KEY)
		})
	}

	const refreshToken = () => {
		const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
		if (refreshToken && refreshToken !== '') {
			return authApi.refreshToken()
				.then(loginCallback)
				.catch(() => {
					localStorage.removeItem(REFRESH_TOKEN_KEY)
					return false
				})
		}
		return false
	}

	const isAuthenticated = () => {
		const sessionStore = useSessionStore()
		return new Promise((resolve, reject) => {
			if (sessionStore.getLoggedIn()) {
				resolve(true)
			} else {
				reject(new Error('No Token!'))
			}
		}).catch(() => {
			return refreshToken()
		})
	}

	function register(payload) {
		return authApi.register(payload).then(loginCallback)
	}

	function loginCallback({ data }) {
		console.log(data)
		const sessionStore = useSessionStore()
		if (data.user) {
			sessionStore.setUser(data.user)
		}

		sessionStore.setLoggedIn(true)
		sessionStore.setToken(data.token)
		localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token)

		return true
	}

	return { login, logout, isAuthenticated, refreshToken, register }
}