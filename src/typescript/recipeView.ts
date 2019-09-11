import Vue from 'vue';
import Component from 'vue-class-component';
import RecipeCard from "../components/RecipeCard.vue";

@Component({
    components: {
        RecipeCard
    }
})
export default class Recipes extends Vue {
    private recipe = null;

    public created(): void {
        try {
            this.$store.dispatch('getById', this.$route.params.id).then((recipe) => {
                this.recipe = recipe;
            });
        } catch (e) {
            console.log(e);
        }
        /*recipesServices.getById(this.$route.params.id)
            .then(data => {
                this.recipe = data;
                console.log(this.recipe);
            })
            .catch(({message}) => {
                console.log(message);
            });*/
    }
}