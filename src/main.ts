import Vue, { VNode } from 'vue';
import Vuelidate from 'vuelidate';
import Toasted from 'vue-toasted';
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
Vue.use(Toasted, {
    position: 'bottom-center',
    duration: 3000,
    keepOnHover: true,
    fullWidth: true,
    singleton: true
})

new Vue({
    router,
    store,
    render: (h): VNode => h(App)
}).$mount('#app');
