import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import RecipeCard from "../components/RecipeCard.vue"
import {recipesServices} from './recipesServices';

@Component({
    components: {
        RecipeCard
    }
})
export default class Recipes extends Vue {
    @Prop() 
    recipes = [];

    created(): void {
        recipesServices.getAll()
            .then(data => {
                this.recipes = data;
            })
            .catch(({message}) => {
                console.log(message);
            });
    }
}