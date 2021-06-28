import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import VueMaterial from 'vue-material';
import VueResource from 'vue-resource';

Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.use(VueResource);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
