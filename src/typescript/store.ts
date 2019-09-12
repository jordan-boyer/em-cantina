import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import {recipesServices} from "./recipesServices";
import { IRecipe, Difficulty } from './recipes';
import { IFilters } from './filters';

Vue.use(Vuex);

interface RootState {
    recipes: IRecipe[];
    filters: IFilters
}

const store: StoreOptions<RootState> = {
    state: {
        recipes: [],
        filters: {
            title: "",
            difficulty: "",
            nbPersons: {
                min: 0,
                max: 100
            },
            time: 240
        }
    },
    getters: {
        getById: (state): Function => (id: string): IRecipe | undefined => { 
            return state.recipes.find((recipe: IRecipe): boolean => recipe.id.toString() === id);
        },
        getFilteredList: (state) => {
            let nbPersonsMin = state.filters.nbPersons.min === "" ? 0 : state.filters.nbPersons.min;
            let nbPersonsMax = state.filters.nbPersons.max === "" ? 100 : state.filters.nbPersons.max;
            let time = state.filters.time === "" ? Number.MAX_VALUE : state.filters.time;
            let filteredList = state.recipes.filter((recipe: IRecipe) => {
                return recipe.titre.toLowerCase().includes(state.filters.title.toLowerCase()) &&
                recipe.personnes >= nbPersonsMin && 
                recipe.personnes <= nbPersonsMax &&
                recipe.tempsPreparation <= time
            });
            if (state.filters.difficulty !== "")
                filteredList = filteredList.filter((recipe: IRecipe) => recipe.niveau === state.filters.difficulty)
            return filteredList
        }
    },
    mutations: {
        setRecipes(state, payload: IRecipe[]): void {
            state.recipes = payload;
        },
        addRecipe(state, payload: IRecipe): void {
            state.recipes.push(payload);
        },
        setFiltersTitle(state, title: string): void {
            state.filters.title = title;
        },
        setFiltersTime(state, time: number): void {
            state.filters.time = time;
        },
        setFiltersDifficulty(state, Difficulty: Difficulty | ""): void {
            state.filters.difficulty = Difficulty;
        },
        setFiltersPersonMin(state, min: number): void {
            state.filters.nbPersons.min = min;
        },
        setFiltersPersonMax(state, max: number): void {
            state.filters.nbPersons.max = max;
        }
    },
    actions: {
        async getAllRecipes({commit}): Promise<any> {
            commit('setRecipes', await recipesServices.getAll());
        },
        async getById({commit, getters}, id): Promise<any> {
            let recipe = getters.getById(id);
            if (!recipe) {
                recipe = await recipesServices.getById(id);
                commit('addRecipe', recipe);
            }
            return Promise.resolve(recipe);
        },
        filtersTitle({commit}, newtitle) {
            commit('setFiltersTitle', newtitle)
        },
        filtersTime({commit}, newTime) {
            commit('setFiltersTime', newTime)
        },
        filtersDifficulty({commit}, newDifficulty) {
            commit('setFiltersDifficulty', newDifficulty)
        },
        filtersPersonMin({commit}, newMin) {
            commit('setFiltersPersonMin', newMin)
        },filtersPersonMax({commit}, newMax) {
            commit('setFiltersPersonMax', newMax)
        }
    }
};

export default new Vuex.Store<RootState>(store);