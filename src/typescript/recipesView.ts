import Vue from 'vue';
import Component from 'vue-class-component';
import {  } from 'vue-property-decorator'
import RecipeCard from "../components/RecipeCard.vue";
import {IRecipe, Difficulty} from './recipes';

@Component({
    components: {
        RecipeCard
    }
})
export default class Recipes extends Vue {
    private recipes: IRecipe[] = [];
    public difficulty = Difficulty;

    get filtersTitle() {
        return this.$store.state.filters.title;
    }
    set filtersTitle(newTitle: string) {
        this.$store.dispatch('filtersTitle', newTitle);
    }

    get filtersTime() {
        return this.$store.state.filters.time;
    }
    set filtersTime(newTime: number) {
        this.$store.dispatch('filtersTime', newTime);
    }

    get filtersDifficulty() {
        return this.$store.state.filters.difficulty;
    }
    set filtersDifficulty(newDifficulty: Difficulty | "") {
        this.$store.dispatch('filtersDifficulty', newDifficulty);
    }

    get filtersPersonMin() {
        return this.$store.state.filters.nbPersons.min;
    }
    set filtersPersonMin(newMin: number) {
        this.$store.dispatch('filtersPersonMin', newMin);
    }

    get filtersPersonMax() {
        return this.$store.state.filters.nbPersons.max;
    }
    set filtersPersonMax(newMax: number) {
        this.$store.dispatch('filtersPersonMax', newMax);
    }

    get filteredList() {
        return this.$store.getters.getFilteredList;
    }

    public created(): void {
        try {
            this.$store.dispatch('getAllRecipes')
                .then((): void => {
                    this.recipes = this.$store.state.recipes;
                });
        } catch (e) {
            console.log(e);
        }
    }
}