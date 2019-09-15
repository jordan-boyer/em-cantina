import Vue from 'vue';
import Component from 'vue-class-component';
import {Route} from 'vue-router';
import {Validations} from 'vuelidate-property-decorators';
import {required, minValue} from 'vuelidate/lib/validators';
import { Difficulty, Unit, UnitString, IRecipe } from './recipes';

@Component
export default class Form extends Vue {
    public difficulty = Difficulty;
    public unit = Unit;

    public get getUnit(): string[] {
        let unit = [""];
        for (let item in Unit) {
            if (isNaN(Number(item)))
                unit.push(item);
        }
        return unit;
    }

    public async submitForm(e: Event): Promise<any> {
        if (this.$v.$invalid)
            return this.$v.$touch();
        let recipe: IRecipe = {...this.$store.state.newRecipe};
        let ingredients = [];
        for (let ingredient of recipe.ingredients) {
            let tmp = [];
            let ingredientUnit = ingredient[1] !== "" ? this.unit[(ingredient[1] as UnitString)]: "";
            tmp.push(ingredient[0] + ingredientUnit);
            tmp.push(ingredient[2]);
            ingredients.push(tmp);
        }
        recipe.ingredients = ingredients;
        try {
            if (this.$route.name === "formNew") {
                await this.$store.dispatch('addRecipe', recipe);
                this.$toasted.success("Création d'une nouvelle recette terminée");
                this.$router.push('/recettes');
            } 
            else if (this.$route.name === "formEdit") {
                await this.$store.dispatch('editRecipe', recipe);
                this.$toasted.success("Modification acceptée");
                this.$router.push(`/recette/${recipe.id}`);
            }
            this.$store.commit('cleanRecipe');
        } catch(error) {
            this.$toasted.error(error.message);
        }
        return Promise.resolve();
    }

    public checkValidity(name: string) {
        if (name === "ingredients" && this.$v.ingredients)
            this.$v.ingredients.$touch();
        if (name === "steps" && this.$v.steps)
            this.$v.steps.$touch();
    }

    public add(name: string): void {
        this.checkValidity(name);
        this.$store.commit('add', name);
    }

    public remove(name: string, key: number) : void {
        this.checkValidity(name);
        this.$store.commit('remove', {name, key});
    }

    public get ingredients(): string[][] {
        return this.$store.state.newRecipe.ingredients;
    }

    public setIngredients(e: Event, key1: number, key2: number) {
        let target = event ? event.target as HTMLInputElement : null;
        if (target) {
            this.$store.commit('changeIngredients', {key1, key2, value:target.value});
        } 
    }

    public get steps(): string[] {
        return this.$store.state.newRecipe.etapes;
    }

    public setSteps(e: Event, key: number) {
        let target = event ? event.target as HTMLInputElement : null;
        if (target) {
            this.$store.commit('changeSteps', {key, value:target.value});
        }
    }

    public get title() {
        return this.$store.state.newRecipe.titre;
    }

    public set title(value) {
        this.$store.commit("setNewRecipeField", {name: "titre", value});
    }

    public get description() {
        return this.$store.state.newRecipe.description;
    }

    public set description(value) {
        this.$store.commit("setNewRecipeField", {name: "description", value});
    }

    public get diffculty() {
        return this.$store.state.newRecipe.niveau;
    }

    public set diffculty(value) {
        this.$store.commit("setNewRecipe", {name: "niveau", value});
    }

    public get person() {
        return this.$store.state.newRecipe.personnes;
    }

    public set person(value) {
        this.$store.commit("setNewRecipe", {name: "personnes", value});
    }

    public get time() {
        return this.$store.state.newRecipe.tempsPreparation;
    }

    public set time(value) {
        this.$store.commit("setNewRecipe", {name: "tempsPreparation", value});
    }

    public get photo() {
        return this.$store.state.newRecipe.photo;
    }

    public set photo(value) {
        this.$store.commit("setNewRecipe", {name: "photo", value});
    }

    public changeNewRecipe(recipe: IRecipe) {
        let copy = {...recipe};
        let ingredients = [];

        for (let ingredient of copy.ingredients) {
            let ingredientTmp = [];
            for (let item in Unit) {
                if (isNaN(Number(item))) {
                    let unitString = Unit[item as UnitString]
                    let unitLength = unitString.length;
                    let ingredientLength = ingredient[0].length;
                    if (ingredientLength > 1 && ingredientLength > unitLength) {
                        let test = ingredient[0].substring(ingredientLength - unitLength);
                        if (test === unitString) {
                            ingredientTmp.push(ingredient[0].substring(0,ingredientLength - unitLength));
                            ingredientTmp.push(unitString);
                            break;
                        }
                    }
                }
            }
            if (!ingredientTmp.length) {
                ingredientTmp.push(ingredient[0]);
                ingredientTmp.push("");  
            }
            ingredientTmp.push(ingredient[1]);
            ingredients.push(ingredientTmp);
        }
        copy.ingredients = ingredients;
        this.$store.commit('setNewRecipe', copy);
    }

    public async getContent(id: string): Promise<any> {
        try {
            let recipe: IRecipe = await this.$store.dispatch("getById", id);
            this.changeNewRecipe(recipe);
        } catch (error) {
            this.$toasted.error(error.message);
            this.$router.push('/');
        }
        return Promise.resolve();
    }

    public beforeRouteUpdate (to: Route, from: Route, next: () => void): void  {
        if (from.name === "formEdit") {
            this.getContent(to.params.id)
        }
        next();
    }

    public beforeRouteLeave (to: Route, from: Route, next: () => void): void  {
        if (to.name === "formNew" && from.name === "formEdit") {
            this.$store.commit("cleanRecipe");
        }
        next();
    }

    public created(): void {
        if(this.$route.name === "formEdit") {
            this.getContent(this.$route.params.id)
        }
    }

    @Validations()
    validations = {
        time: {required, minValue: minValue(1)},
        person: {required, minValue: minValue(1)},
        title: {required},
        description: {required},
        photo: {
            url: (url: string) => {
                if(url.startsWith("http") || url.startsWith("https"))
                    return true;
                else
                    return false;
            }
        },
        steps: {
            required,
            $each: (steps: string[]) => {
                let valid = true;
                for (let step of steps) {
                    if (step === "") {
                        valid = false;
                        break;
                    }
                }
                return valid;
            }
        },
        ingredients: {
            required,
            $each: (ingredients: string[][]) => {
                let valid = true;
                for (let ingredient of ingredients) {
                    if (ingredient[2] === "") {
                        valid = false;
                        break;
                    }
                }
                return valid;
            }
        }
    }
}