import Vue from 'vue'
import Vuex from "vuex"
import {router} from "@/routes"

Vue.use(Vuex)


export default new Vuex.Store({
	state: {
		pageNumber: 1,
		searchQuery: null,
		status: null,
		gender: null,
		species: null,
		statusList: [{
			'label': 'Tous',
			'value': null
		}, {
			'label': 'Mort',
			'value': "Dead"
		}, {
			'label': 'Vivant',
			'value': "Alive"
		}],
		genderList: [{
			'label': 'Tous',
			'value': null
		}, {
			'label': 'Femme',
			'value': "female"
		}, {
			'label': 'Homme',
			'value': "male"
		}, {
			'label': 'Sans genre',
			'value': "genderless"
		}, {
			'label': 'Inconnu',
			'value': "unknown"
		}]
	},
	mutations: {
		clearFilter() {
			this.updatePage(1);
			this.updateSearch(null);
			this.updateStatus(null);
			this.updateGender(null);
			this.updateSpecies(null);
		},
		updatePageState(state, pageNumber) {
			state.pageNumber = pageNumber;
		},
		updateSearchState(state, searchQuery) {
			state.searchQuery = searchQuery;
		},
		updateStatusState(state, status) {
			state.status = status;
		},
		updateGenderState(state, gender) {
			state.gender = gender;
		},
		updateSpeciesState(state, species) {
			state.species = species;
		},
		updateCurrentUrl(state) {
			let routeQuery = {};
			if (state.pageNumber > 1) routeQuery.page = (String(state.pageNumber))
			if (state.searchQuery) routeQuery.name = state.searchQuery
			if (state.status) routeQuery.status = state.status
			if (state.gender) routeQuery.gender = state.gender
			if (state.species) routeQuery.species = state.species
			if (router.currentRoute.query !== routeQuery) {
				router.push({query: routeQuery})
			}

		},
	},
	actions: {
		updateFromRouterQuery({commit}) {
			console.log(router.currentRoute.query);
			commit('updatePageState', router.currentRoute.query.page ? router.currentRoute.query.page : 1)
			commit('updateSearchState', router.currentRoute.query.name ? router.currentRoute.query.name : null)
			commit('updateStatusState', router.currentRoute.query.status ? router.currentRoute.query.status : null)
			commit('updateGenderState', router.currentRoute.query.gender ? router.currentRoute.query.gender : null)
			commit('updateSpeciesState', router.currentRoute.query.species ? router.currentRoute.query.species : null)
		},
		updateAll({commit}, newStates) {
			commit('updatePageState', newStates.pageNumber)
			commit('updateSearchState', newStates.searchQuery)
			commit('updateStatusState', newStates.status)
			commit('updateGenderState', newStates.gender)
			commit('updateSpeciesState', newStates.species)
			commit('updateCurrentUrl')
		},
		updatePageNumber({commit}, pageNumber) {
			commit('updatePageState', pageNumber)
			commit('updateCurrentUrl')
		},
		updateSearch({commit}, searchQuery) {
			commit('updatePageState', 1)
			commit('updateSearchState', searchQuery)
			commit('updateCurrentUrl')
		},
		updateStatus({commit}, status) {
			commit('updatePageState', 1)
			commit('updateStatusState', status)
			commit('updateCurrentUrl')
		},
		updateGender({commit}, gender) {
			commit('updatePageState', 1)
			commit('updateGenderState', gender)
			commit('updateCurrentUrl')
		},
		updateSpecies({commit}, species) {
			commit('updatePageState', 1)
			commit('updateSpeciesState', species)
			commit('updateCurrentUrl')
		}
	},
	getters: {
		filters: state => {
			return [
				{
					'label': 'search',
					'name': 'Recherche par nom',
					'type': 'input',
				},
				{
					'name': 'Status',
					'label': 'Status',
					'type': 'buttonList',
					'values': state.statusList,
				},
				{
					'name': 'Genre',
					'label': 'Gender',
					'type': 'buttonList',
					'values': state.genderList,
				}
			];
		},
		pageNumber: state => {
			return state.pageNumber;
		},
		searchQuery: state => {
			return state.searchQuery;
		},
		status: state => {
			return state.status;
		},
		gender: state => {
			return state.gender;
		},
		species: state => {
			return state.species;
		}
	}
})
