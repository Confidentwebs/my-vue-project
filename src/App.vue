<template>
  <div id="app">
    <Navbar />
    <HamburgerMenu />
    <CreateRepo />
    <RouterView />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import HamburgerMenu from './components/HamburgerMenu.vue';
import CreateRepo from './components/createRepo.vue';

export default {
  components: {
    Navbar,
    HamburgerMenu,
    CreateRepo
  }
}
</script>

<style scoped>

</style>