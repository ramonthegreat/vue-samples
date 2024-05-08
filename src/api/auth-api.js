import { useHttp } from "@/api/http";

const http = useHttp('http://localhost:1001/api');
export default {
	login (data) {
		return http.sendRequest('post', '/login', data).then(response => response)
	},
	register(data) {
		return http.sendRequest('post', '/register', data).then(response => response)
	},
	logout() {
		return http.sendRequest('delete', '/logout').then(response => response)
	},
	refreshToken() {
		return http.sendRequest('post', '/refresh-token').then(response => response)
	}
}