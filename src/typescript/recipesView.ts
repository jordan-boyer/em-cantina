import Vue from 'vue';
import Component from 'vue-class-component';
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