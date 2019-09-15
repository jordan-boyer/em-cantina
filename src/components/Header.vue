<template>
    <header class="header">
        <h1 class="header-title">em-cantina</h1>
        <h2 class="header-subtitle">L'application de recette geek</h2>
        <nav class="navbar">
            <router-link :class="{ 'navbar-link-active': $route.name === 'recipes'}" to="/" class="navbar-link">Liste des Recettes</router-link>
            <router-link :class="{ 'navbar-link-active': $route.name === 'formNew'}" to="/recettes" class="navbar-link">Créer une nouvelle recette</router-link>
        </nav>
    </header>
</template>

<script>
export default {
    name: "Header"
};
</script>

<style lang="scss" scoped src="../scss/header.scss">

</style>