<template>
    <div v-if="recipe" @click="checkClick" class="recipecard">
        <h4 class="recipecard-header">{{ recipe.titre }}</h4>
        <p class="recipecard-description"><span class="bold underline">Description:</span> {{ recipe.description }}</p>
        <p class="recipecard-difficulty"><span class="bold underline">Niveau de difficulté:</span> {{ recipe.niveau }}</p>
        <p class="recipecard-person">Pour <span class="bold underline">{{ recipe.personnes }}</span> {{Number(recipe.personnes) > 1 ? "personnes": "personne"}}</p>
        <p class="recipecard-time"><span class="bold underline">Temps de préparation:</span> {{ time }}</p>
        <ul v-if="showAll" class="recipecard-ingredients">
            <span class="bold underline">{{recipe.ingredients.length > 1 ? "Ingredients" : "Ingredient"}}:</span>
            <li v-for="ingredient in recipe.ingredients" :key="getIngredient(ingredient)"> {{ getIngredient(ingredient) }}</li>
        </ul>
        <ul v-if="showAll" class="recipecard-steps">
            <span class="bold underline">{{recipe.etapes.length > 1 ? "Etapes" : "Etape"}}:</span>
            <li v-for="step in recipe.etapes" :key="step"> {{ step }}</li>
        </ul>
        <img class="recipecard-photo" :src="recipe.photo ? recipe.photo : defaultImg" alt="Photo de la recette">
        <button class="recipecard-btn recipecard-btn--edition" @click="editRecipe">Edition</button>
        <button class="recipecard-btn recipecard-btn--sup" @click="showModal = true">Supprimer</button>
        <modal v-if="showModal" @close="showModal = false" @ok="deleteRecipe">
            <h3 slot="header">Voulez vous vraiment supprimer cette recette</h3>
            <p slot="body">Attention cette action est irréversible</p>
        </modal>
    </div>
</template>

<script lang="ts" src="../typescript/recipeCard.ts"></script>

<style lang="scss" src="../scss/recipeCard.scss" scoped></style>