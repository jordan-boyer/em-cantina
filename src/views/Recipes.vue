<template>
    <div>
        <div class="filter">
            <p>Filtres: </p>
            <div class="filter-group">
                <label for="filter-title">Titre: </label>
                <input class="filter-input" type="search" id="filter-title" v-model="filtersTitle">
            </div>
            <div class="filter-group">
                <label for="filter-difficulty">Difficulté: </label>
                <select id="filter-difficulty" v-model="filtersDifficulty">
                    <option value="" selected>Toute difficulté</option>
                    <option :value="difficulty.PADAWAN">{{ difficulty.PADAWAN }}</option>
                    <option :value="difficulty.JEDI">{{ difficulty.JEDI }}</option>
                    <option :value="difficulty.MAITRE">{{ difficulty.MAITRE }}</option>
                </select>   
            </div>
            
            <div class="filter-group">
                <span class="padding-sm">
                    Nombre de personne entre 
                </span>
                <input class="filter-input" type="number" name="X" min="0" v-model="filtersPersonMin">
                <span class="padding-sm">et</span>
                <input class="filter-input" type="number" name="Y" min="0" v-model="filtersPersonMax">
            </div>
            <div class="filter-group">
                <label for="filter-time">Temps &lt; en minutes: </label>
                <input class="filter-input" type="number" id="filter-time" min="0" v-model="filtersTime">
            </div>
            
        </div>
        <div class="grid-list">
            <recipe-card class="click" v-for="recipe in filteredList" :key="recipe.id" :recipe="recipe" @CLICK="goToRecipe(recipe)"/>
        </div>
    </div>
</template>

<script lang="ts" src="../typescript/recipesView.ts">

</script>

<style lang="scss" src="../scss/recipesView.scss" scoped>

</style>