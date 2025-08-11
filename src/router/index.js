import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/AppHome.vue'
import PokemonDetails from '../pages/PokemonDetails.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/pokemon/:id', component: PokemonDetails }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
