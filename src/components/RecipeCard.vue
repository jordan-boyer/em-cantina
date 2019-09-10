<template>
    <div>
        <h4>{{ recipe.titre }}</h4>
        <p>{{ recipe.description }}</p>
        <p>{{ recipe.niveau }}</p>
        <p>{{ recipe.personnes }}</p>
        <p>{{ recipe.tempsPreparation}}</p>
        <ul v-if="showAll" class="ingredients">
            <li v-for="ingredient in recipe.ingredients" :key="`${ingredient[0]} ${ingredient[1]}`"> {{ `${ingredient[0]} ${ingredient[1]}` }}</li>
        </ul>
        <ul v-if="showAll" class="steps">
            <li v-for="step in recipe.etapes" :key="step"> {{ step }}</li>
        </ul>
        <img :src="recipe.photo" alt="Photo de la recette">
    </div>
</template>

<script lang="ts" src="../typescript/recipeCard.ts"></script>

<style lang="scss" scoped scr="../scss/recipeCard.scss"></style>