<template>
    <div v-if="recipe" @click="checkClick">
        <h4>{{ recipe.titre }}</h4>
        <p>Description: {{ recipe.description }}</p>
        <p>Niveau de difficulté: {{ recipe.niveau }}</p>
        <p>Pour {{ recipe.personnes }} {{Number(recipe.personnes) > 1 ? "personnes": "personne"}}</p>
        <p>Temps de préparation: {{ time }}</p>
        <ul v-if="showAll" class="ingredients">
            {{recipe.ingredients.length > 1 ? "Ingredients" : "Ingredient"}}:
            <li v-for="ingredient in recipe.ingredients" :key="getIngredient(ingredient)"> {{ getIngredient(ingredient) }}</li>
        </ul>
        <ul v-if="showAll" class="steps">
            {{recipe.etapes.length > 1 ? "Etapes" : "Etape"}}:
            <li v-for="step in recipe.etapes" :key="step"> {{ step }}</li>
        </ul>
        <img :src="recipe.photo ? recipe.photo : defaultImg" alt="Photo de la recette">
        <button @click="editRecipe">Edition</button>
        <button @click="showModal = true">Supprimé</button>
        <modal v-if="showModal" @close="showModal = false" @ok="deleteRecipe">
            <h3 slot="header">Voulez vous vraiment supprimé cette recette</h3>
            <p slot="body">Attention cette action est irréversible</p>
        </modal>
    </div>
</template>

<script lang="ts" src="../typescript/recipeCard.ts"></script>

<style lang="scss" scoped scr="../scss/recipeCard.scss"></style>