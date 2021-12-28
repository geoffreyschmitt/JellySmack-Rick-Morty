import AccueilVue from '@/components/Accueil.vue';
import BaseLayout from '@/components/BaseLayout.vue';
import ListingLayout from '@/components/ListingLayout.vue';
import CharacterListing from '@/components/CharacterListing';
import Character from '@/components/Character';
import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'accueil',
		component: AccueilVue
	},
	{
		path: '/',
		name: 'baseLayout',
		component: BaseLayout,
		children: [
			{
				path: '/',
				name: 'listingLayout',
				component: ListingLayout,
				children: [
					{
						path: 'characters',
						name: 'characters',
						component: CharacterListing,
						props: true
					}
				]
			},
			{
				path: '/characters/:id',
				name: 'character',
				component: Character,
				props: castRouteParams
			}
		]
	},
	{
		path: '*',
		redirect: '/'
	}
];


function castRouteParams(route) {
	let id = route.params.id;

	if (typeof id !== 'number') {
		id = Number(id);
	}
	return {
		id: id
	};
}

export const router = new VueRouter({
	mode: 'history',
	routes: routes
});
