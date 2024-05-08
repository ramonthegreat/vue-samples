import { useHttp } from "@/api/http";

const http = useHttp('http://localhost:1001/api');
export default {
	loadAuthUser () {
		return http.sendRequest('get', '/auth-user').then(response => response)
	},
	addPokemon (data) {
		return http.sendRequest('post', '/user-pokemon/add', data).then(response => response)
	},
	removePokemon (data) {
		return http.sendRequest('post', '/user-pokemon/remove', data).then(response => response)
	},
	getUsers (data) {
		return http.sendRequest('get', '/users', data).then(response => response)
	},
	getUser (id) {
		return http.sendRequest('get', `/user/${id}`).then(response => response)
	},
	updateProfile (data) {
		return http.sendRequest('post', '/user/update-profile', data).then(response => response)
	},
}