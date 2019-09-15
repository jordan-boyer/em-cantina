import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { IRecipe } from './recipes';

@Component
export default class RecipeCard extends Vue {
    @Prop({ default: null, type: Object as () => IRecipe }) public recipe!: IRecipe | null;
    @Prop({ default: false, type: Boolean }) public readonly showAll!: boolean;

    public async deleteRecipe(): Promise<any> {
        if (this.recipe) {
            try {
                await this.$store.dispatch('deleteRecipe', this.recipe.id);
                this.$toasted.success('Recette supprimée avec succès');
                this.$emit('delete');
            } catch (error) {
                this.$toasted.error(error.message);
            }
            return Promise.resolve();
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

    public checkClick(e: Event): void {
        let target = e.target ? e.target as HTMLElement : null;
        if (target && target.nodeName !== "BUTTON") {
            this.$emit('CLICK');
        }
    }
}