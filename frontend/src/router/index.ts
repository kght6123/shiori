import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/views/Home.vue'
import Setting from '@/views/Setting.vue'
import MyPage from '@/views/MyPage.vue'
import SearchKeyword from '@/views/SearchKeyword.vue'
import FavoriteOnly from '@/views/FavoriteOnly.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:id',
    name: 'MyPage',
    component: MyPage,
  },
  {
    path: '/:id/:keyword',
    name: 'SearchKeyword',
    component: SearchKeyword,
  },
  {
    path: '/:id/setting',
    name: 'Setting',
    component: Setting,
  },
  {
    path: '/:id/favorite',
    name: 'FavoriteOnly',
    component: FavoriteOnly,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
