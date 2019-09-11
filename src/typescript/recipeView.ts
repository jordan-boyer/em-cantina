import Vue from 'vue';
import Component from 'vue-class-component';
import {Route} from 'vue-router';
import RecipeCard from "../components/RecipeCard.vue";

@Component({
    components: {
        RecipeCard
    }
})
export default class Recipes extends Vue {
    private recipe = null;


    public getContent(id: string): void {
        this.$store.dispatch('getById', id).then((recipe): void => {
            this.recipe = recipe;
        }).catch(({message}): void => {
            console.log(message);
        });
    }
    public created(): void {
        this.getContent(this.$route.params.id);
    }

    public beforeRouteUpdate (to: Route, from: Route, next: () => void): void {
        this.getContent(to.params.id);
        next();
    }
}