import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator'
import { IRecipe } from './recipes';

@Component
export default class RecipeCard extends Vue {
    @Prop({type: Object as () => IRecipe}) readonly recipe!: IRecipe;
    @Prop({ default: false, type: Boolean }) readonly showAll!: Boolean;
}