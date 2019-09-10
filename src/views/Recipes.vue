<template>
    <div class="grid-list">
        <recipe-card v-for="recipe in recipes" :key="recipe.id" :recipe="recipe"/>
    </div>
</template>

<script lang="ts" src="../typescript/recipesView.ts">

</script>

<style lang="scss" scoped>

</style>