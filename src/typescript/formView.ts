import Vue from 'vue';
import Component from 'vue-class-component';
import {Validations} from 'vuelidate-property-decorators';
import {required, minValue, url, minLength} from 'vuelidate/lib/validators';
import { Difficulty, Unit, UnitString, IRecipe } from './recipes';
import {recipesServices} from './recipesServices'

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

    public submitForm(e: Event): void {
        if (this.$v.$invalid)
            return this.$v.$touch();
        let recipe: IRecipe = this.$store.state.newRecipe;
        let tmpIngredients = recipe.ingredients;
        let ingredients = [];
        for (let ingredient of recipe.ingredients) {
            let tmp = [];
            let ingredientUnit = ingredient[1] !== "" ? this.unit[(ingredient[1] as UnitString)]: "";
            tmp.push(ingredient[0] + ingredientUnit);
            tmp.push(ingredient[2]);
            ingredients.push(tmp);
        }
        recipe.ingredients = ingredients;
        recipesServices.add(recipe);
        recipe.ingredients = tmpIngredients;
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
        this.$store.commit("setNewRecipe", {name: "titre", value});
    }

    public get description() {
        return this.$store.state.newRecipe.description;
    }

    public set description(value) {
        this.$store.commit("setNewRecipe", {name: "description", value});
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

    @Validations()
    validations = {
        time: {required, minValue: minValue(1)},
        person: {required, minValue: minValue(1)},
        title: {required},
        description: {required},
        photo: {url},
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
                    if (ingredient[0] === "" || ingredient[2] === "") {
                        valid = false;
                        break;
                    }
                }
                return valid;
            }
        }
    }
}