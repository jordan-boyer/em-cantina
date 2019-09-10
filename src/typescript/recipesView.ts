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
    private recipes: IRecipe[] = [];

    public created(): void {
        recipesServices.getAll()
            .then(data => {
                this.recipes = data;
                //console.log(this.recipes);
            })
            .catch(({message}) => {
                console.log(message);
            });
    }
}