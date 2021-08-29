import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/views/Home.vue'
import Setting from '@/views/Setting.vue'
import MyPage from '@/views/MyPage.vue'

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
    path: '/:id/setting',
    name: 'Setting',
    component: Setting,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
