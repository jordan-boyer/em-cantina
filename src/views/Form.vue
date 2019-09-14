<template>
    <form @submit.prevent="submitForm">
        <div class="form-group">
            <label for="recipe-titre">Titre: </label>
            <input type="text" id="recipe-titre" v-model="$v.title.$model" @blur="$v.title.$touch()">
            <span v-if="$v.title.$dirty && $v.title.$invalid">Le champs est requis</span>
        </div>
        <div class="form-group">
            <label for="recipe-description">Description: </label>
            <input type="text" id="recipe-description" v-model="$v.description.$model" @blur="$v.description.$touch()">
            <span v-if="$v.description.$dirty && $v.description.$invalid">Le champs est requis</span>
        </div>
        <div class="form-group">
            <label for="recipe-description">Difficulté: </label>
            <select id="recipe-difficulty" v-model="diffculty">
                <option :value="difficulty.PADAWAN" selected>{{ difficulty.PADAWAN }}</option>
                <option :value="difficulty.JEDI">{{ difficulty.JEDI }}</option>
                <option :value="difficulty.MAITRE">{{ difficulty.MAITRE }}</option>
            </select>
        </div>
        <div class="form-group">
            <label for="recipe-ingredients">Ingredients: </label>
            <ul id=recipe-ingredients>
                <li v-for="(ingredient, key) in ingredients" :key="key">
                    <input type="text" v-model.trim="$v.ingredients.$model[key][0]" @input="setIngredients($event, key, 0)">
                    <span v-if="$v.ingredients.$dirty && $v.ingredients.$model[key][0] === ''">Le champs est requis</span>
                    <select v-model="$v.ingredients.$model[key][1]" @input="setIngredients($event, key, 1)">
                        <option v-for="ingredientUnit in getUnit" :value="ingredientUnit" :key="ingredientUnit">{{ unit[ingredientUnit] }}</option>
                    </select>
                    <input type="text" v-model.trim="$v.ingredients.$model[key][2]" @input="setIngredients($event, key, 2)">
                    <span v-if="$v.ingredients.$dirty && $v.ingredients.$model[key][2] === ''">Le champs est requis</span>
                    <input type="button" value="X" @click="remove('ingredients', key)">
                </li>
            </ul>
            <input type="button" value="Ajouter un ingrédient" @click="add('ingredients')">
            <span v-if="$v.ingredients.$dirty && !$v.ingredients.required">Votre recette dois avoir au minimum un ingredient</span>
        </div>
        <div class="form-group">
            <label for="recipe-steps">Etapes: </label>
            <ol id=recipe-steps>
                <li v-for="(step, key) in steps" :key="key">
                    <textarea cols="50" rows="4" v-model.trim='$v.steps.$model[key]' @input="setSteps($event, key)"></textarea>
                    <span v-if="$v.steps.$dirty && $v.steps.$model[key] === ''">Le champs est requis</span>
                    <input type="button" value="X" @click="remove('steps', key)">
                </li>
            </ol>
            <input type="button" value="Ajouter une étape" @click="add('steps')">
            <span v-if="$v.steps.$dirty && !$v.steps.required">Votre recette dois avoir au minimum une étape</span>
        </div>
        <div class="form-group">
            <label for="recipe-nbperson">Nombre de personnes: </label>
            <input type="number" min="0" id="recipe-nbperson" v-model.number="person" @blur="$v.person.$touch()">
            <span v-if="$v.person.$dirty && $v.person.$invalid">Le nombre de personnes doit être supérieur à 0</span>
        </div>
        <div class="form-group">
            <label for="recipe-time">Durée: </label>
            <input type="number" min="0" id="recipe-time" v-model.number="time" @blur="$v.time.$touch()">
            <span v-if="$v.time.$dirty && $v.time.$invalid">La durée doit être supérieur à 0</span>
        </div>
        <div class="form-group">
            <label for="recipe-photo">Photo: </label>
            <input type="url" id="recipe-photo" placeholder="http:// ou https://" v-model="photo" @blur="$v.photo.$touch()">
            <span v-if="$v.photo.$dirty && $v.photo.$invalid">Photo doit être une url en http ou https</span>
        </div>
        
        <input type="submit" id="recipe-send" value="Créer recette">
    </form>
</template>

<script lang="ts" src="../typescript/formView.ts"></script>

<style lang="scss" scoped>

</style>