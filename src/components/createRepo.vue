<template>
  <div>
    <input v-model="repoName" placeholder="Repository Name" />
    <button @click="createRepo">Create Repo</button>
    <button @click="deleteRepo">Delete Repo</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';

const repoName = ref('');
const errorMessage = ref('');
const createdRepos = reactive(new Set());

const createRepo = async () => {
  try {
    await axios.post('https://api.github.com/user/repos', {
      name: repoName.value,
    }, {
      headers: {
        Authorization: `token ${process.env.VUE_APP_GITHUB_TOKEN}`,
      },
    });
    createdRepos.add(repoName.value);
    errorMessage.value = '';
  } catch (error) {
    errorMessage.value = 'Failed to create repository';
  }
};
</script>