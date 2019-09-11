import Vue from 'vue';
import Component from 'vue-class-component';
import RecipeCard from "../components/RecipeCard.vue";
import {IRecipe} from './recipes';

@Component({
    components: {
        RecipeCard
    }
})
export default class Recipes extends Vue {
    recipes: IRecipe[] = []

    public created(): void {
        try {
            this.$store.dispatch('getAllRecipes')
                .then(() => {
                    this.recipes = this.$store.state.recipes;
                });
        } catch (e) {
            console.log(e);
        }
    }
}