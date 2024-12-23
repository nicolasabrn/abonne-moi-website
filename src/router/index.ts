import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

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
      // Lazy load the blog page
      component: () => import('../pages/BlogPage.vue')
    },
    {
      path: '/blog/:slug',
      name: 'blog-post',
      // Lazy load the blog post page
      component: () => import('../pages/BlogPost.vue')
    }
  ]
})

export default router
