import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import {recipesServices} from "./recipesServices"
import { IRecipe } from './recipes';

Vue.use(Vuex);

interface RootState {
    recipes: IRecipe[]
}

const store: StoreOptions<RootState> = {
    state: {
        recipes: []
    },
    getters: {
        getById: (state) => (id: string) => { 
            return state.recipes.find((recipe: IRecipe) => recipe.id.toString() === id)
        }
    },
    mutations: {
        setRecipes(state, payload: IRecipe[]) {
            state.recipes = payload;
        },
        addRecipe(state, payload: IRecipe) {
            state.recipes.push(payload);
        }
    },
    actions: {
        async getAllRecipes({commit}) {
            commit('setRecipes', await recipesServices.getAll());
        },
        async getById({commit, getters}, id) {
            let recipe = getters.getById(id);
            if (!recipe) {
                recipe = await recipesServices.getById(id)
                commit('addRecipe', recipe);
            }
            return Promise.resolve(recipe);
        }
    }
};

export default new Vuex.Store<RootState>(store);