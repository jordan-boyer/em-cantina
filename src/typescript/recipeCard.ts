import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import Modal from '../components/Modal.vue';
import { IRecipe } from './recipes';

@Component({
    components: {
        Modal
    }
})
export default class RecipeCard extends Vue {
    @Prop({ default: null, type: Object as () => IRecipe }) public recipe!: IRecipe | null;
    @Prop({ default: false, type: Boolean }) public readonly showAll!: boolean;

    public showModal: boolean = false;
    public defaultImg:string = require('../assets/default.jpg');

    public async deleteRecipe(): Promise<any> {
        this.showModal = false;
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

    public get time(): string {
        let timeString = "";
        if (this.recipe) {
            if (this.recipe.tempsPreparation >= 60) {
                let hours = this.recipe.tempsPreparation / 60;
                let minutes = this.recipe.tempsPreparation % 60;
                timeString = `${hours}h${minutes === 0 ? "" : minutes > 1 ? "minutes" : "minute"}`;
            } else {
                timeString = this.recipe.tempsPreparation.toString() + (this.recipe.tempsPreparation > 1 ? "minutes" : "minute");
            }
        }
        return timeString
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