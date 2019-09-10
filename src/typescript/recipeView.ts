import Vue from 'vue';
import Component from 'vue-class-component';
import RecipeCard from "../components/RecipeCard.vue";
import {recipesServices} from './recipesServices';
import {IRecipe} from './recipes';

@Component({
    components: {
        RecipeCard
    }
})
export default class Recipes extends Vue {
    private recipe = null;

    public created(): void {
        recipesServices.getById(this.$route.params.id)
            .then(data => {
                this.recipe = data;
                console.log(this.recipe);
            })
            .catch(({message}) => {
                console.log(message);
            });
    }
}