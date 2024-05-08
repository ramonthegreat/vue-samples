import axios from "axios";
import {useSessionStore} from "@/stores/session";

export const useHttp = (baseUrl, withBearer = true) => {
	let http = axios.create({
		baseURL: baseUrl,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}
	})

	http.interceptors.request.use(function (config) {
		// Do something before request is sent
		if (withBearer) {
			const session = useSessionStore()
			let token = session.getToken()
			if (token === '') {
				const refreshToken = localStorage.getItem('rtk')
				if (refreshToken !== '') {
					config.headers.Authorization = `Bearer ${refreshToken}`
				}
			} else {
				config.headers.Authorization = `Bearer ${token}`
			}
		}

		return config;
	}, function (error) {
		// Do something with request error
		return Promise.reject(error);
	});

	// Add a response interceptor
	http.interceptors.response.use(function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	}, function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	});

	const sendRequest = function (method, path, data = {}) {
		method = method.toLowerCase();

		if (method === 'get') {
			data = {
				params: data
			}
		}

		return http[method](path, data);
	}

	return { sendRequest }
}
