import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { IRecipe } from './recipes';

@Component
export default class RecipeCard extends Vue {
    @Prop({ default: null, type: Object as () => IRecipe }) public recipe!: IRecipe | null;
    @Prop({ default: false, type: Boolean }) public readonly showAll!: boolean;

    public deleteRecipe(): void {
        if (this.recipe) {
            this.$store.dispatch('deleteRecipe', this.recipe.id).then((): void => {
                this.recipe = null;
            });
        }
    }

    public editRecipe(): void {
        if (this.recipe)
            this.$router.push(`/recette/edit/${this.recipe.id}`);
    }

    public goToRecipe(): void {
        if (this.recipe)
            this.$router.push(`/recette/${this.recipe.id}`);
    }

    public getIngredient(ingredient: string[]): string {
        let ingredientList = '';
        for (let list of ingredient) {
            ingredientList += list + ' ';
        }
        ingredientList.trimEnd();
        return ingredientList;
    }
}