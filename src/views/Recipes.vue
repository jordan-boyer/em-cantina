<template>
    <div>
        <div>
            <p>Filtres</p>
            <label for="filter-title">Titre</label>
            <input type="search" id="filter-title" v-model="filtersTitle">
            <label for="filter-difficulty">Difficulté</label>
            <select id="filter-difficulty" v-model="filtersDifficulty">
                <option value="" selected>Toute difficulté</option>
                <option :value="difficulty.PADAWAN">{{ difficulty.PADAWAN }}</option>
                <option :value="difficulty.JEDI">{{ difficulty.JEDI }}</option>
                <option :value="difficulty.MAITRE">{{ difficulty.MAITRE }}</option>
            </select>
            <div>
                Nombre de personne entre <input type="number" name="X" min="0" v-model="filtersPersonMin"> et <input type="number" name="Y" min="0" v-model="filtersPersonMax">
            </div>
            <label for="filter-time">Temps &lt; en minutes</label>
            <input type="number" id="filter-time" min="0" v-model="filtersTime">
        </div>
        <div class="grid-list">
            <recipe-card v-for="recipe in filteredList" :key="recipe.id" :recipe="recipe" @CLICK="goToRecipe(recipe)"/>
        </div>
    </div>
</template>

<script lang="ts" src="../typescript/recipesView.ts">

</script>

<style lang="scss" scoped>

</style>