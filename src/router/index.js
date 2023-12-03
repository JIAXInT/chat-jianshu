import { createRouter, createWebHistory } from 'vue-router'
import BlogDetailView from '../views/BlogDetailView.vue'
import LoginView from '../views/LoginView.vue'
import MyBlogsView from '../views/MyBlogsView.vue'
import Register from '../views/Register.vue'
import CreateEditsBlogView from '../views/CreateEditsBlogView.vue'
import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/home',
      component: HomeView
    },
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/my-blogs',
      component: MyBlogsView
    },
    {
      path: '/blog/:id/edit/',
      component: CreateEditsBlogView
    },
    {
      path: '/blog-detail/:id',
      component: BlogDetailView
    },
    {
      path: '/about',
      component: AboutView
    }
  ]
})

export default router
