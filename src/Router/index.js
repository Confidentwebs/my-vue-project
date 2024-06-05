import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import SocialsView from '../views/SocialsView.vue'
import DetailsView from '../views/DetailsView.vue'
import ErrorView from '../views/ErrorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/socials',
      name: 'socials',
      component: SocialsView
    },
    {
      path: '/details/:id',
      name: 'details',
      component: DetailsView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'errorPage',
      component: ErrorView
    }
  ]
})

export default router
