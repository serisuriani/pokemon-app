<template>
  <div
    class="card p-3 h-100 shadow-sm"
    :style="{ backgroundColor: typeStyles[mainType]?.bg || '#eee', borderColor: typeStyles[mainType]?.border || '#ccc' }"
  >
    <div class="image-wrapper mx-auto mb-3">
      <img
        :src="pokemon.image"
        :alt="pokemon.name"
        class="pokemon-img"
      />
    </div>
    <h5 class="card-title text-center text-capitalize mb-2" :style="{ color: typeStyles[mainType]?.text || '#333' }">
      {{ pokemon.name }}
    </h5>
    <p class="text-center text-muted small mb-3">
      Height: {{ pokemon.height }} | Weight: {{ pokemon.weight }}
    </p>

    <div class="d-flex justify-content-center flex-wrap gap-2">
      <span
        v-for="type in pokemon.types"
        :key="type"
        class="type-badge"
        :style="{
          backgroundColor: typeStyles[type]?.badgeBg || '#bbb',
          color: typeStyles[type]?.badgeText || '#fff',
          borderColor: typeStyles[type]?.badgeBorder || '#888'
        }"
      >
        <span class="me-1">{{ typeStyles[type]?.icon || '❓' }}</span>
        {{ type }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },
  computed: {
    mainType() {
      return this.pokemon.types[0] || null;
    }
  },
  data() {
    return {
      typeStyles: {
        normal:  { bg: '#f5f5dc', border: '#bdb76b', text: '#6b6b47', badgeBg: '#bdb76b', badgeText: '#fff', badgeBorder: '#999', icon: '⚪' },
        fire:    { bg: '#fff1e6', border: '#ff6f3c', text: '#b04219', badgeBg: '#ff6f3c', badgeText: '#fff', badgeBorder: '#b24d2d', icon: '🔥' },
        water:   { bg: '#e0f0ff', border: '#3299ff', text: '#1a4d80', badgeBg: '#3299ff', badgeText: '#fff', badgeBorder: '#2673b8', icon: '💧' },
        electric:{ bg: '#fffbea', border: '#ffdd57', text: '#a68d00', badgeBg: '#ffdd57', badgeText: '#333', badgeBorder: '#bba500', icon: '⚡' },
        grass:   { bg: '#e9f6e9', border: '#6cc060', text: '#3b633b', badgeBg: '#6cc060', badgeText: '#fff', badgeBorder: '#4c7f4c', icon: '🍃' },
        ice:     { bg: '#e6f7f7', border: '#72c7c7', text: '#2f7070', badgeBg: '#72c7c7', badgeText: '#fff', badgeBorder: '#478f8f', icon: '❄️' },
        fighting:{ bg: '#f9e6e6', border: '#cc3d3d', text: '#802020', badgeBg: '#cc3d3d', badgeText: '#fff', badgeBorder: '#993333', icon: '🥊' },
        poison:  { bg: '#f4e6f9', border: '#9a4db2', text: '#5a2e74', badgeBg: '#9a4db2', badgeText: '#fff', badgeBorder: '#713f91', icon: '☠️' },
        ground:  { bg: '#f9f1e6', border: '#d3aa48', text: '#826d33', badgeBg: '#d3aa48', badgeText: '#fff', badgeBorder: '#a3872c', icon: '🌍' },
        flying:  { bg: '#f0e9ff', border: '#9079ff', text: '#3f3299', badgeBg: '#9079ff', badgeText: '#fff', badgeBorder: '#644ebf', icon: '🕊️' },
        psychic: { bg: '#fde9f0', border: '#e1537e', text: '#7b2e43', badgeBg: '#e1537e', badgeText: '#fff', badgeBorder: '#b53f63', icon: '🔮' },
        bug:     { bg: '#f4f9e6', border: '#a0c449', text: '#5e7340', badgeBg: '#a0c449', badgeText: '#fff', badgeBorder: '#7a9647', icon: '🐛' },
        rock:    { bg: '#f9f6e6', border: '#bba84d', text: '#6b5f30', badgeBg: '#bba84d', badgeText: '#fff', badgeBorder: '#998633', icon: '🪨' },
        ghost:   { bg: '#ebe6f9', border: '#7a6cbf', text: '#3f3680', badgeBg: '#7a6cbf', badgeText: '#fff', badgeBorder: '#584ea6', icon: '👻' },
        dragon:  { bg: '#e6e9f9', border: '#6a79ff', text: '#33408f', badgeBg: '#6a79ff', badgeText: '#fff', badgeBorder: '#485fcf', icon: '🐉' },
        dark:    { bg: '#e6e4e1', border: '#7a6b5f', text: '#3f362f', badgeBg: '#7a6b5f', badgeText: '#fff', badgeBorder: '#584e42', icon: '🌑' },
        steel:   { bg: '#f2f2f7', border: '#9999bb', text: '#555577', badgeBg: '#9999bb', badgeText: '#fff', badgeBorder: '#76769a', icon: '⚙️' },
        fairy:   { bg: '#f9e6f1', border: '#d87bbe', text: '#7b3f6b', badgeBg: '#d87bbe', badgeText: '#fff', badgeBorder: '#b45a91', icon: '✨' }
      }
    }
  }
}
</script>

<style scoped>
.card {
  border-width: 2px;
  border-style: solid;
  border-radius: 15px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 20px rgba(0, 123, 255, 0.25);
}

.image-wrapper {
  width: 140px;
  height: 140px;
  background: white;
  border-radius: 50%;
  padding: 10px;
  margin: 0 auto;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pokemon-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.type-badge {
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.35em 0.75em;
  border-radius: 12px;
  border: 1.5px solid;
  display: inline-flex;
  align-items: center;
  user-select: none;
  text-transform: capitalize;
}
</style>
