import { createRouter, createWebHistory } from 'vue-router'

// @ts-ignore
import HomeView from '../views/HomeView.vue'
import SeriesDetail from "@/views/SeriesDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },{
      path: '/seriesDetail/:seriesId',
      name: 'seriesDetail',
      component: SeriesDetail
    },
  ]
})

export default router
