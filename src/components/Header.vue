<template>
    <header class="header">
        <nav class="navbar">
            <router-link to="/" class="navbar-link">Liste des Recettes</router-link>
            <router-link to="/recettes" class="navbar-link">Créer une nouvelle recette</router-link>
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