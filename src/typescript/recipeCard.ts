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
                this.$emit('delete');
            });
        }
    }

    public editRecipe(): void {
        if (this.recipe)
            this.$router.push(`/recette/edit/${this.recipe.id}`);
    }

    public getIngredient(ingredient: string[]): string {
        let ingredientList = '';
        for (let list of ingredient) {
            ingredientList += list + ' ';
        }
        ingredientList.trimEnd();
        return ingredientList;
    }

    public checkClick(e: Event) {
        let target = e.target ? e.target as HTMLElement : null
        if (target && target.nodeName !== "BUTTON") {
            this.$emit('CLICK');
        }
    }
}