import { useHttp } from "@/api/http";

const http = useHttp('https://pokeapi.co/api/v2', false);
export default {
	getList (data) {
		return http.sendRequest('get', '/pokemon', data).then(response => response)
	}
}