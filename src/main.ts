import Vue, { VNode } from 'vue';
import Vuelidate from 'vuelidate';
import Component from 'vue-class-component';
import App from './App.vue';
import router from './typescript/router';
import store from './typescript/store';
import './typescript/registerServiceWorker';

Vue.config.productionTip = false;

Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate',
]);

Vue.use(Vuelidate);

new Vue({
    router,
    store,
    render: (h): VNode => h(App)
}).$mount('#app');
