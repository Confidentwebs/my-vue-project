<template>
    <div class="menu">
      <button @click="toggleMenu">
        <span v-if="isOpen">Close</span>
        <span v-else class="hamburger">&#9776;</span>
      </button>
      <ul v-if="isOpen">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About Me</a></li>
        <li><a href="/socials">My Socials</a></li>
      </ul>
    </div>
    <br></br>
    <br></br>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isOpen = ref(false);
  
  const toggleMenu = () => {
    isOpen.value = !isOpen.value;
  };
  </script>

  <style>
  .hamburger {
  font-size: 1.5rem;
  cursor: pointer;
  color: black;
  
}


.menu{
  float: right;
  margin-right: 5%;
}

</style>