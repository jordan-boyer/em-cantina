<template>
    <div>
        <recipe-card v-if="recipe" :recipe="recipe" :showAll="true" @delete="recipe = null"/>
    </div>
</template>

<script lang="ts" src="../typescript/recipeView.ts">

</script>

<style lang="scss" scoped>

</style>