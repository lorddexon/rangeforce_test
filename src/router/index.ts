import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../components/Search.vue'
import Bookmarks from '../components/Bookmarks.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Search',
    component: Search
  }, {
    path: '/bookmarks',
    name: 'Bookmarks',
    component: Bookmarks
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
