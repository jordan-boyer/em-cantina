import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import {recipesServices} from "./recipesServices";
import { IRecipe, Difficulty, BaseRecipe, RecipeType} from './recipes';
import { IFilters } from './filters';

Vue.use(Vuex);

interface RootState {
    recipes: IRecipe[];
    filters: IFilters;
    newRecipe: IRecipe;
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
        },
        newRecipe: {...BaseRecipe}
    },
    getters: {
        getById: (state): Function => (id: string): IRecipe | undefined => { 
            return state.recipes.find((recipe: IRecipe): boolean =>  {
                if (recipe.id)
                    return recipe.id.toString() === id;
                return false; 
            });
        },
        getFilteredList: (state): IRecipe[] => {
            let nbPersonsMin = state.filters.nbPersons.min === "" ? 0 : state.filters.nbPersons.min;
            let nbPersonsMax = state.filters.nbPersons.max === "" ? 100 : state.filters.nbPersons.max;
            let time = state.filters.time === "" ? Number.MAX_VALUE : state.filters.time;

            let filteredList = state.recipes.filter((recipe: IRecipe): boolean => {
                return recipe.titre.toLowerCase().includes(state.filters.title.toLowerCase()) &&
                recipe.personnes >= nbPersonsMin && 
                recipe.personnes <= nbPersonsMax &&
                recipe.tempsPreparation < time;
            });

            if (state.filters.difficulty !== "")
                filteredList = filteredList.filter((recipe: IRecipe): boolean => recipe.niveau === state.filters.difficulty);
                
            return filteredList;
        }
    },
    mutations: {
        setRecipes(state, payload: IRecipe[]): void {
            state.recipes = payload;
        },
        addRecipe(state, payload: IRecipe): void {
            state.recipes.push(payload);
        },
        editRecipe(state, payload: IRecipe):void {
            let index = state.recipes.findIndex((recipe) => recipe.id === payload.id);
            state.recipes.splice(index, 1, payload);
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
        },
        removeRecipe(state, payload): void {
            let index = state.recipes.findIndex((recipe) => recipe.id === payload.recette.id);
            state.recipes.splice(index, 1);
        },
        remove(state, payload): void {
            if (payload.name === "ingredients")
                state.newRecipe.ingredients.splice(payload.key, 1);
            else if (payload.name === "steps")
                state.newRecipe.etapes.splice(payload.key, 1);
        },
        add(state, name): void {
            if (name === "ingredients")
                state.newRecipe.ingredients.push(["","",""]);
            else if (name === "steps")
                state.newRecipe.etapes.push("");
        },
        changeIngredients(state, payload): void {
            state.newRecipe.ingredients[payload.key1][payload.key2] = payload.value;
        },
        changeSteps(state, payload): void {
            state.newRecipe.etapes[payload.key] = payload.value;
        },
        setNewRecipe(state, payload) {
            state.newRecipe = payload;
        },
        setNewRecipeField(state, payload): void {
            let name = payload.name as RecipeType;
            let value = payload.value as never;
            state.newRecipe[name] = value;
        },
        cleanRecipe(state): void {
            state.newRecipe = {...BaseRecipe};
            state.newRecipe.ingredients = [["","",""]];
            state.newRecipe.etapes = [""];
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
        async deleteRecipe({commit}, id): Promise<any> {
            commit('removeRecipe', await recipesServices.removeById(id));
            return Promise.resolve();
        },
        async addRecipe({commit}, recipe): Promise<any> {
            let newRecipe = await recipesServices.add(recipe);
            commit('addRecipe', newRecipe.recette);
            return Promise.resolve();
        },
        async editRecipe({commit}, recipe): Promise<any> {
            let editRecipe = await recipesServices.edit(recipe);
            commit('editRecipe', editRecipe.recette);
            return Promise.resolve();
        },
        filtersTitle({commit}, newtitle) {
            commit('setFiltersTitle', newtitle);
        },
        filtersTime({commit}, newTime) {
            commit('setFiltersTime', newTime);
        },
        filtersDifficulty({commit}, newDifficulty) {
            commit('setFiltersDifficulty', newDifficulty);
        },
        filtersPersonMin({commit}, newMin) {
            commit('setFiltersPersonMin', newMin);
        },filtersPersonMax({commit}, newMax) {
            commit('setFiltersPersonMax', newMax);
        }
    }
};

export default new Vuex.Store<RootState>(store);