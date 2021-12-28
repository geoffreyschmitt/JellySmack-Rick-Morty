import Vue from 'vue'
import Vuex from "vuex"

Vue.use(Vuex)
import filters from "@/stores/filters"

export default new Vuex.Store({
	state: {
		baseUrl: "https://rickandmortyapi.com/api/character/",
	},
	getters: {
		apiUrl: state => {
			return state.baseUrl;
		},
		apiUrlFromFilters: state => {
			let urlToReturn = state.baseUrl;
			let urlFilterPart = "";
			urlFilterPart += filters.getters.pageNumber ? `page=${filters.getters.pageNumber}` : "";
			if (filters.getters.searchQuery) {
				urlFilterPart += urlFilterPart !== "" ? "&" : "";
				urlFilterPart += `name=${filters.getters.searchQuery}`
			}
			if (filters.getters.status) {
				urlFilterPart += urlFilterPart !== "" ? "&" : "";
				urlFilterPart += `status=${filters.getters.status}`
			}
			if (filters.getters.gender) {
				urlFilterPart += urlFilterPart !== "" ? "&" : "";
				urlFilterPart += `gender=${filters.getters.gender}`
			}
			if (filters.getters.species) {
				urlFilterPart += urlFilterPart !== "" ? "&" : "";
				urlFilterPart += `species=${filters.getters.species}`
			}
			urlToReturn += urlFilterPart !== "" ? "?" + urlFilterPart : "";
			return urlToReturn;
		}
	}
})
