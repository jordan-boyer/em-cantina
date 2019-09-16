import Vue from 'vue';
import Component from 'vue-class-component';
import {Route} from 'vue-router';
import RecipeCard from "../components/RecipeCard.vue";
import { IRecipe } from './recipes';

@Component({
    components: {
        RecipeCard
    }
})
export default class Recipes extends Vue {
    private recipe: null | IRecipe = null;

    public async getContent(id: string): Promise<any> {
        try {
            let recipe = await this.$store.dispatch('getById', id);
            this.recipe = recipe;
        } catch (error) {
            this.recipe = null;
            this.$toasted.error(error.message);
        }
        return Promise.resolve();
    }
    public created(): void {
        this.getContent(this.$route.params.id);
    }

    public beforeRouteUpdate (to: Route, from: Route, next: () => void): void {
        this.getContent(to.params.id);
        next();
    }

    public deleteRecipe(): void {
        this.recipe = null;
        this.$router.push("/");
    }
}