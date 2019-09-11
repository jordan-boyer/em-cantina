<template>
  <div id="app">
    <Header/>
    <router-view class="main-content"/>
    <Footer/>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
    name: "app",
    components: {
        Header,
        Footer
    }
};
</script>

<style lang="scss" src="./scss/main.scss">

</style>
