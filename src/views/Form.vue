<template>
    <form class="form" @submit.prevent="submitForm">
        <h3>Créer une nouvelle recette</h3>
        <ul>
            <li class="form-group" :class="{ 'form-group-invalid': $v.title.$dirty && $v.title.$invalid }">
                <label for="recipe-titre">Titre</label>
                <input class="form-input" type="text" name="recipe-titre" v-model="$v.title.$model" @blur="$v.title.$touch()">
                <span v-if="$v.title.$dirty && $v.title.$invalid">Le champs est requis</span>
            </li>
            <li class="form-group" :class="{ 'form-group-invalid': $v.description.$dirty && $v.description.$invalid }">
                <label for="recipe-description">Description</label>
                <input class="form-input" type="text" name="recipe-description" v-model="$v.description.$model" @blur="$v.description.$touch()">
                <span v-if="$v.description.$dirty && $v.description.$invalid">Le champs est requis</span>
            </li>
            <li class="form-group">
                <label for="recipe-description">Difficulté</label>
                <select class="form-input" name="recipe-difficulty" v-model="diffculty">
                    <option :value="difficulty.PADAWAN" selected>{{ difficulty.PADAWAN }}</option>
                    <option :value="difficulty.JEDI">{{ difficulty.JEDI }}</option>
                    <option :value="difficulty.MAITRE">{{ difficulty.MAITRE }}</option>
                </select>
            </li>
            <li class="form-group" :class="{ 'form-group-invalid': $v.ingredients.$dirty && !$v.ingredients.required }">
                <label for="recipe-ingredients">Ingredients</label>
                <ul name=recipe-ingredients>
                    <li class="form-group form-group--multiple" :class="{ 'form-group-invalid': $v.ingredients.$dirty && $v.ingredients.$model[key][2] === '' }" v-for="(ingredient, key) in ingredients" :key="key">
                        <input placeholder="Quantité" class="form-input" type="text" v-model.trim="$v.ingredients.$model[key][0]" @input="setIngredients($event, key, 0)">
                        <select class="form-input" v-model="$v.ingredients.$model[key][1]" @input="setIngredients($event, key, 1)">
                            <option v-for="ingredientUnit in getUnit" :value="ingredientUnit" :key="ingredientUnit">{{ unit[ingredientUnit] }}</option>
                        </select>
                        <input placeholder="ingrédient" class="form-input" type="text" v-model.trim="$v.ingredients.$model[key][2]" @input="setIngredients($event, key, 2)">
                        <span v-if="$v.ingredients.$dirty && $v.ingredients.$model[key][2] === ''">Le champs est requis</span>
                        <input class="form-input" type="button" value="X" @click="remove('ingredients', key)">
                    </li>
                </ul>
                <input class="form-input" type="button" value="Ajouter un ingrédient" @click="add('ingredients')">
                <span v-if="$v.ingredients.$dirty && !$v.ingredients.required">Votre recette dois avoir au minimum un ingredient</span>
            </li>
            <li class="form-group" :class="{ 'form-group-invalid': $v.steps.$dirty && !$v.steps.required }">
                <label for="recipe-steps">Etapes</label>
                <ol name=recipe-steps>
                    <li class="form-group form-group--multiple" :class="{ 'form-group-invalid': $v.steps.$dirty && $v.steps.$model[key] === '' }" v-for="(step, key) in steps" :key="key">
                        <textarea placeholder="Etape" class="form-input" cols="50" rows="7" v-model.trim='$v.steps.$model[key]' @input="setSteps($event, key)"></textarea>
                        <span v-if="$v.steps.$dirty && $v.steps.$model[key] === ''">Le champs est requis</span>
                        <input class="form-input" type="button" value="X" @click="remove('steps', key)">
                    </li>
                </ol>
                <input class="form-input" type="button" value="Ajouter une étape" @click="add('steps')">
                <span v-if="$v.steps.$dirty && !$v.steps.required">Votre recette doit avoir au minimum une étape</span>
            </li>
            <li class="form-group" :class="{ 'form-group-invalid': $v.person.$dirty && $v.person.$invalid }">
                <label for="recipe-nbperson">Nombre de personnes</label>
                <input class="form-input" type="number" min="0" name="recipe-nbperson" v-model.number="$v.person.$model" @blur="$v.person.$touch()">
                <span v-if="$v.person.$dirty && $v.person.$invalid">Le nombre de personnes doit être supérieur à 0</span>
            </li>
            <li class="form-group" :class="{ 'form-group-invalid': $v.time.$dirty && $v.time.$invalid }">
                <label for="recipe-time">Durée</label>
                <input class="form-input" type="number" min="0" name="recipe-time" v-model.number="$v.time.$model" @blur="$v.time.$touch()">
                <span v-if="$v.time.$dirty && $v.time.$invalid">La durée doit être supérieure à 0</span>
            </li>
            <li class="form-group" :class="{ 'form-group-invalid': $v.photo.$dirty && $v.photo.$invalid }">
                <label for="recipe-photo">Photo</label>
                <input class="form-input" type="url" name="recipe-photo" placeholder="http:// ou https://" v-model="$v.photo.$model" @blur="$v.photo.$touch()">
                <span v-if="$v.photo.$dirty && $v.photo.$invalid">Photo doit être une url en http ou https</span>
            </li>
        </ul>
        
        
        <input class="form-submit" type="submit" :value="this.$route.name === 'formEdit'? 'Editer la recette' : 'Envoyer votre recette'">
    </form>
</template>

<script lang="ts" src="../typescript/formView.ts"></script>

<style lang="scss" src="../scss/formView.scss" scoped>

</style>