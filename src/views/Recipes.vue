<template>
    <div class="grid-list">
        <recipe-card v-for="recipe in recipes" :key="recipe.id"/>
    </div>
</template>

<script lang="ts" src="../typescript/recipes.ts">

</script>

<style lang="scss" scoped>

</style>