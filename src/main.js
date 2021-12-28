import Vue from 'vue'
import {router} from './routes.js';
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	render: h => h(App),
}).$mount('#app')
