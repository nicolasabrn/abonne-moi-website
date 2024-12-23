import { createRouter, createWebHistory } from 'vue-router'
import BlogPage from '../pages/BlogPage.vue'
import BlogPostPage from '../pages/BlogPostPage.vue'
import Home from '@/pages/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogPage
    },
    {
      path: '/blog/:slug',
      name: 'blog-post',
      component: BlogPostPage
    }
  ]
})

export default router
