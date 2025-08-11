<template>
  <div class="container py-4" v-if="pokemon">
    <button class="btn btn-outline-secondary mb-4" @click="$router.back()">
      ← Back to list
    </button>

    <div class="card shadow-sm mx-auto pastel-card" style="max-width: 700px;">
      <div class="row g-0">
        <div
          class="col-md-4 d-flex align-items-center justify-content-center p-3 pastel-type-bg"
          :style="{ backgroundColor: pastelColors[mainType] || '#f0f0f0' }"
        >
          <img
            :src="pokemon.image"
            :alt="pokemon.name"
            class="img-fluid"
            style="max-height: 200px; object-fit: contain"
          />
        </div>

        <div class="col-md-8 p-4">
          <h2 class="text-capitalize mb-3">{{ pokemon.name }}</h2>

          <ul class="list-unstyled mb-4">
            <li><strong>Height:</strong> {{ pokemon.height }}</li>
            <li><strong>Weight:</strong> {{ pokemon.weight }}</li>
            <li>
              <strong>Types:</strong>
              <div class="mt-2">
                <span
                  v-for="type in pokemon.types"
                  :key="type"
                  class="badge me-1 text-capitalize d-inline-flex align-items-center"
                  :style="{
                    backgroundColor: typeStyles[type]?.color || '#777',
                    color: '#fff',
                    fontWeight: '600'
                  }"
                >
                  <span class="me-1">{{ typeStyles[type]?.icon || '❓' }}</span>
                  {{ type }}
                </span>
              </div>
            </li>
          </ul>

          <hr />

          <h5>Edit Pokémon Info</h5>
          <form @submit.prevent="saveEdit" class="needs-validation" novalidate>
            <div class="mb-3">
              <label for="nameInput" class="form-label">Name</label>
              <input
                id="nameInput"
                v-model="editName"
                type="text"
                class="form-control text-capitalize"
                required
              />
            </div>

            <div class="mb-3 row">
              <div class="col">
                <label for="heightInput" class="form-label">Height</label>
                <input
                  id="heightInput"
                  v-model.number="editHeight"
                  type="number"
                  min="0"
                  class="form-control"
                  required
                />
              </div>

              <div class="col">
                <label for="weightInput" class="form-label">Weight</label>
                <input
                  id="weightInput"
                  v-model.number="editWeight"
                  type="number"
                  min="0"
                  class="form-control"
                  required
                />
              </div>
            </div>

            <button type="submit" class="btn btn-success">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <AppLoader v-else />
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePokemonStore } from '../stores/pokemonStore'
import AppLoader from '../components/AppLoader.vue'

export default {
  components: { AppLoader },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = usePokemonStore()
    const pokemonId = Number(route.params.id)

    const pokemon = computed(() =>
      store.pokemons.find(p => p.id === pokemonId) || null
    )

    const editName = ref('')
    const editHeight = ref(0)
    const editWeight = ref(0)

    const typeStyles = {
      normal:  { color: '#A8A77A', icon: '⚪' },
      fire:    { color: '#EE8130', icon: '🔥' },
      water:   { color: '#6390F0', icon: '💧' },
      electric:{ color: '#F7D02C', icon: '⚡' },
      grass:   { color: '#7AC74C', icon: '🍃' },
      ice:     { color: '#96D9D6', icon: '❄️' },
      fighting:{ color: '#C22E28', icon: '🥊' },
      poison:  { color: '#A33EA1', icon: '☠️' },
      ground:  { color: '#E2BF65', icon: '🌍' },
      flying:  { color: '#A98FF3', icon: '🕊️' },
      psychic: { color: '#F95587', icon: '🔮' },
      bug:     { color: '#A6B91A', icon: '🐛' },
      rock:    { color: '#B6A136', icon: '🪨' },
      ghost:   { color: '#735797', icon: '👻' },
      dragon:  { color: '#6F35FC', icon: '🐉' },
      dark:    { color: '#705746', icon: '🌑' },
      steel:   { color: '#B7B7CE', icon: '⚙️' },
      fairy:   { color: '#D685AD', icon: '✨' }
    }


    const pastelColors = {
      normal:  '#E0E3C5',
      fire:    '#F7C89B',
      water:   '#B4D7F2',
      electric:'#FFF9B0',
      grass:   '#CAE8B5',
      ice:     '#C6E4E9',
      fighting:'#F2B9B1',
      poison:  '#D4B9E2',
      ground:  '#E9DEBA',
      flying:  '#D7D7F2',
      psychic: '#F4BAD0',
      bug:     '#D3E4A8',
      rock:    '#D9D2A3',
      ghost:   '#C4B4D7',
      dragon:  '#B7B1F9',
      dark:    '#A39887',
      steel:   '#D7D8E2',
      fairy:   '#F5D1D8'
    }

    const mainType = computed(() => (pokemon.value?.types[0] || '').toLowerCase())

    watch(
      pokemon,
      (newP) => {
        if (newP) {
          editName.value = newP.name
          editHeight.value = newP.height
          editWeight.value = newP.weight
        } else {
          router.push('/')
        }
      },
      { immediate: true }
    )

    onMounted(() => {
      if (store.pokemons.length === 0) store.fetchPokemons()
    })

    function saveEdit() {
      if (
        !editName.value.trim() ||
        editHeight.value < 0 ||
        editWeight.value < 0
      ) {
        alert('Please fill in valid values before saving.')
        return
      }
      store.updatePokemon({
        ...pokemon.value,
        name: editName.value.trim(),
        height: editHeight.value,
        weight: editWeight.value
      })
      alert('Pokémon info updated successfully!')
    }

    return {
      pokemon,
      editName,
      editHeight,
      editWeight,
      saveEdit,
      typeStyles,
      pastelColors,
      mainType
    }
  }
}
</script>

<style scoped>
.pastel-card {
  border-radius: 1rem;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}
.pastel-card:hover {
  box-shadow: 0 8px 20px rgba(0, 123, 255, 0.3);
}

.pastel-type-bg {
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  transition: background-color 0.3s ease;
}
</style>
