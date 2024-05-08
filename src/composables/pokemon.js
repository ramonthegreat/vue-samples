import pokemonApi from "@/api/pokemon-api";
import {onMounted, ref, toValue} from "vue";
export function usePokemon(){
	const pokemonList = ref([])
	const limit = 10
	const pagination = ref({
		previous: null,
		next: null,
		current: 0
	})

	function loadPokemonList(page) {
		return pokemonApi.getList({limit, offset: toValue(page)}).then(({data}) => {
			pokemonList.value = data.results

			pagination.value.next = null
			if (data.next) {
				const nextParams = (new URL(data.next)).searchParams;
				pagination.value.next = Number(nextParams.get('offset'))
			}

			pagination.value.previous = null
			if (data.previous) {
				const previousParams = (new URL(data.previous)).searchParams;
				pagination.value.previous = Number(previousParams.get('offset'))
			}

			pagination.value.current = page
		})
	}
	return { pokemonList, loadPokemonList, pagination }
}
