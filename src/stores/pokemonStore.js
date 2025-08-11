import { defineStore } from 'pinia'
import axios from 'axios'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [],
    loading: false
  }),
  actions: {
    async fetchPokemons() {
      this.loading = true
      try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100')
        const details = await Promise.all(res.data.results.map(async p => {
          const data = await axios.get(p.url)
          return {
            id: data.data.id,
            name: data.data.name,
            image: data.data.sprites.front_default,
            height: data.data.height,
            weight: data.data.weight,
            types: data.data.types.map(t => t.type.name),
            favorite: false,
            note: ''
          }
        }))
        this.pokemons = details
      } catch (error) {
        console.error(error)
      }
      this.loading = false
    },
    updatePokemon(updated) {
      const idx = this.pokemons.findIndex(p => p.id === updated.id)
      if (idx !== -1) {
        this.pokemons[idx] = updated
      }
    }
  }
})
