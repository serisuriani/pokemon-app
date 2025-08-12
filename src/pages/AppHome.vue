<template>
  <div class="container py-4">
    <h1 class="pokemon-title text-center fw-bold mb-4">
      <img :src="pokeballImg" alt="Pokéball" class="pokeball" />
      Pokémon List
    </h1>

    <div class="d-flex justify-content-center gap-3 mb-3 flex-wrap">
      <div class="input-group" style="max-width: 400px;">
        <span class="input-group-text bg-white border-end-0">
          <i class="bi bi-search"></i>
        </span>
        <input
          type="text"
          v-model="search"
          class="form-control border-start-0"
          placeholder="Search Pokémon by name..."
          autocomplete="off"
          aria-label="Search Pokémon"
        />
      </div>

      <div class="form-check d-flex align-items-center">
        <input
          class="form-check-input"
          type="checkbox"
          id="favoritesOnly"
          v-model="favoritesOnly"
        />
        <label class="form-check-label ms-1" for="favoritesOnly">
          Show Favorites Only
        </label>
      </div>
    </div>

    <Loader v-if="store.loading" />

    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      <div
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        class="col"
        @click="goToDetails(pokemon.id)"
        role="button"
        tabindex="0"
        @keyup.enter="goToDetails(pokemon.id)"
      >
        <PokemonCard
          :pokemon="pokemon"
          @toggle-favorite="handleToggleFavorite"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { usePokemonStore } from '../stores/pokemonStore'
import PokemonCard from '../components/pokemonCard.vue'
import Loader from '../components/AppLoader.vue'
import { useRouter } from 'vue-router'
import pokeballImg from '../assets/pokeball.png' // Adjust path if needed

export default {
  components: { PokemonCard, Loader },
  setup() {
    const store = usePokemonStore()
    const router = useRouter()
    const search = ref('')
    const favoritesOnly = ref(false)

    onMounted(() => {
      if (store.pokemons.length === 0) store.fetchPokemons()
    })

    const filteredPokemons = computed(() => {
      return store.pokemons.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.value.toLowerCase())
        const matchesFavorite = favoritesOnly.value ? p.favorite : true
        return matchesSearch && matchesFavorite
      })
    })

    function goToDetails(id) {
      router.push(`/pokemon/${id}`)
    }

    function handleToggleFavorite(id) {
      const pokemon = store.pokemons.find(p => p.id === id)
      if (pokemon) {
        pokemon.favorite = !pokemon.favorite
      }
    }

    return { store, search, favoritesOnly, filteredPokemons, goToDetails, pokeballImg, handleToggleFavorite }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.pokemon-title {
  font-family: 'Press Start 2P', cursive;
  font-size: 2rem;
  color: #ff0000; /* Pokémon red */
  text-shadow:
    -1px -1px 0 #fff700,  /* bright yellow highlight */
    1px 1px 5px rgba(0,0,0,0.6); /* subtle black shadow */
  letter-spacing: 2px;
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.pokeball {
  width: 32px;
  height: 32px;
  filter: drop-shadow(0 0 2px #000);
  transform: rotate(-15deg);
  user-select: none;
}

.col[role='button'] {
  cursor: pointer;
  /* Hover removed for cleaner look */
}
</style>
