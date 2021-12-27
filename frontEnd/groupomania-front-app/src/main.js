import Vue from 'vue';
import App from './App.vue';
import moment from 'moment';
import router from './router';
import store from '../src/store/modules';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp as fasThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp  as farThumbsUp} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080';
axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
  
        originalRequest._retry = true;
        store.dispatch('LogOut')
        return router.push('/login')
    }
  }
})
library.add(fasThumbsUp, farThumbsUp, faClock);
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
})
Vue.config.productionTip = false
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
