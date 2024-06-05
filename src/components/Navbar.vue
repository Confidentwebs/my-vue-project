
<template>
  <nav>
    <div class="navbar">
      <gitHubIcon class="github-icon"/>
      <h1>Confidence's GitHub.</h1>
    </div>
  </nav>
</template>

<script setup>
  import gitHubIcon from './icons/gitHubIcon.vue';
</script>

<style scoped>
  .navbar {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    background-color: #00bd7e;
    text-align: center;
    padding: 20px;
    margin-bottom: 10px;
  }

  .github-icon {
    font-size: 3rem;
  }
</style>
