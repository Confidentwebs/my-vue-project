<template>
    <div>
      <div class="filter-container">
        <input style="width: 150px;"
          type="text"
          v-model="searchTerm"
          placeholder="Search by repo name"
        />
        <div>
        <select v-model="languageFilter">
          <option value="">Filter by Language</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Vue">Vue</option>
          <!-- Add more options for other languages -->
        </select>
      </div>
        <div>
        <select v-model="visibilityFilter">
          <option value="">Filter by Visibility</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
      </div>
  
      <div class="repo-container">
        <Skeleton v-if="loading" v-for="n in skeleton" :key="n">{{ skeleton }}</Skeleton>
        <div v-else v-for="repo in filteredRepos" :key="repo.id" class="repo-card">
          <router-link :to="`/details/${repo.name}`"><h2 class="repo-name">{{ repo.name }}</h2></router-link>
          <p class="language">Language: {{ repo.language }}</p>
          <p class="date">Start date & time: {{ repo.created_at }}</p>
          <p class="visibility">Visibility: {{ repo.visibility }}</p>
        </div>
      </div>
  
      <div class="pagination">
        <button class="view-more" :class="currentPage === 1 ? 'disabled' : ''" @click="prevPage"><PrevIcon /></button>
        <p class="current-page">{{ currentPage }}</p>
        <button class="view-more" :class="currentPage === lastPage ? 'disabled' : ''" @click="nextPage"><NextIcon /></button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import PrevIcon from './icons/prevIcon.vue';
  import NextIcon from './icons/nextIcon.vue';
  import Skeleton from './Skeleton.vue';
  
  const searchTerm = ref('');
  const languageFilter = ref('');
  const visibilityFilter = ref('');
  const repoData = ref([]);
  const currentPage = ref(1);
  const loading = ref(false);
  const perPage = ref(6);
  const skeleton = ref([...new Array(6)]);
  
  const fetchData = () => {
    loading.value = true;
    fetch('https://api.github.com/users/Confidentwebs/repos', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        repoData.value = repoData.value.concat(data);
        loading.value = false;
      });
  };
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  
  const nextPage = () => {
    if (currentPage.value < lastPage.value) {
      currentPage.value++;
    }
  };
  
  const showMore = computed(() => {
    let start = (currentPage.value - 1) * perPage.value;
    let end = start + perPage.value;
    loading.value = false;
    return repoData.value.slice(start, end);
  });
  
  const lastPage = computed(() => {
    let length = repoData.value.length;
    return Math.ceil(length / perPage.value);
  });
  
  const filteredRepos = computed(() => {
    return showMore.value.filter((repo) => {
      const matchesSearchTerm = repo.name.toLowerCase().includes(searchTerm.value.toLowerCase());
      const matchesLanguage = languageFilter.value === '' || repo.language === languageFilter.value;
      const matchesVisibility = visibilityFilter.value === '' || repo.visibility === visibilityFilter.value;
      return matchesSearchTerm && matchesLanguage && matchesVisibility;
    });
  });
  
  fetchData();
  </script>
  
  <style scoped>
  .filter-container {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-left: 5%;
  }
  
  .repo-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 30px;
    width: 90%;
    margin: 3%;
    margin-bottom: 5rem;
   
  }
  
  .repo-card,
  .repodetail-card {
    border: 1px solid #00bd7e;
    padding: 13px;
    border-radius: 5px;
  }
  
  .repo-name {
    color: #00bd7e;
    font-size: 2rem;
    word-break: break-word;
  }
  
  p {
    padding: 5px 0;
  }
  
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 3rem 0;
  }
  
  button {
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .view-more svg {
    width: 2rem;
  }
  
  .disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  </style>
  