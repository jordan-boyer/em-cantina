import Vue from 'vue';
import Router from 'vue-router';
import Recipes from '../views/Recipes.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'recipes',
            component: Recipes
        }
        //{
        //    path: '/about',
        //    name: 'about',
        //    // route level code-splitting
        //    // this generates a separate chunk (about.[hash].js) for this route
        //    // which is lazy-loaded when the route is visited.
        //    component: async (): Promise<any> => await import(/* webpackChunkName: "about" */ './views/About.vue')
        //}
    ]
});
