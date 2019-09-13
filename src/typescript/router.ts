import Vue from 'vue';
import Router from 'vue-router';
import Recipes from '../views/Recipes.vue';

Vue.use(Router);

export default new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'recipes',
            component: Recipes
        },
        {
            path: '/recette/:id',
            name: 'recipe',
            component: async (): Promise<any> => await import(/* webpackChunkName: "recipe" */ '../views/Recipe.vue')
        },
        {
            path: '/recettes/',
            name: 'formNew',
            component: async (): Promise<any> => await import(/* webpackChunkName: "fromNew" */ '../views/Form.vue')
        },
        {
            path: '/recette/edit/:id',
            name: 'formEdit',
            component: async (): Promise<any> => await import(/* webpackChunkName: "formEdit" */ '../views/Form.vue')
        }
    ],
    scrollBehavior(){
        return { x: 0, y: 0 };
    }
});
