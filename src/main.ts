import Vue, { VNode } from 'vue';
import App from './App.vue';
import router from './typescript/router';
import store from './typescript/store';
import axios, { AxiosStatic } from 'axios';
import './typescript/registerServiceWorker';


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
