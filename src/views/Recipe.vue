<template>
    <div>
        <recipe-card v-if="recipe" :recipe="recipe" :showAll="true" @delete="deleteRecipe"/>
    </div>
</template>

<script lang="ts" src="../typescript/recipeView.ts">

</script>

<style lang="scss" scoped>

</style>