import Vue, { VNode } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios, { AxiosStatic } from 'axios';
import './registerServiceWorker';


axios.defaults.baseURL = 'http://localhost:9000';
Vue.prototype.$axios = axios;
declare module 'vue/types/vue' {
    interface Vue {
        $axios: AxiosStatic;
    }
}

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h): VNode => h(App)
}).$mount('#app');
