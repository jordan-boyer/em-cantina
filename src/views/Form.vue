<template>
    <form @click.prevent="">
        <label for="recipe-titre">Titre: </label>
        <input type="text" id="recipe-titre">
        <label for="recipe-description">Description: </label>
        <input type="text" id="recipe-description">
        <label for="recipe-description">Difficulté: </label>
        <select id="recipe-difficulty">
            <option :value="difficulty.PADAWAN" selected>{{ difficulty.PADAWAN }}</option>
            <option :value="difficulty.JEDI">{{ difficulty.JEDI }}</option>
            <option :value="difficulty.MAITRE">{{ difficulty.MAITRE }}</option>
        </select>
        <label for="recipe-nbperson">Nombre de personnes: </label>
        <input type="number" id="recipe-nbperson">
        <label for="recipe-time">Durée: </label>
        <input type="number" id="recipe-time">
        <label for="recipe-photo">Photo: </label>
        <input type="url" id="recipe-photo" placeholder="http:// ou https://">
    </form>
</template>

<script lang="ts" src="../typescript/formView.ts"></script>

<style lang="scss" scoped>

</style>