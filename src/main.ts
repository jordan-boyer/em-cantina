import Vue, { VNode } from 'vue';
import App from './App.vue';
import router from './typescript/router';
import store from './typescript/store';
import './typescript/registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h): VNode => h(App)
}).$mount('#app');
