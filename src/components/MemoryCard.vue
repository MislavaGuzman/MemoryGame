<template>
  <div class="q-gutter-sm row items-start card" @click="flip"
  :class="{ flipped: card?.flipped || card?.matched }">

    <div v-if="card?.flipped || card?.matched" class="card-content">
      <q-img
        :src="getImageSrc(card.value)"
        spinner-color="white"
        style="height: 160px; max-width: 170px"
      />
    </div>
    <div v-else class="card-text">?</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { cardsMapping } from '../assets/cardsMapping'; // Importar el mapeo de imágenes
import { Card } from '../stores/game-store';

export default defineComponent({
  props: {
    card: Object as PropType<Card>,
  },
  emits: ['flip'],
  setup(props, { emit }) {

    const isSelected = ref(false);

    const flip = () => {
      if (props.card && !props.card.matched && !props.card.flipped) {

        emit('flip');
        isSelected.value = !isSelected.value;
      }
    };

    const getImageSrc = (value: string) => {
      return cardsMapping[value] || ''; // Obtener la imagen según el mapeo
    };

    return { flip, getImageSrc, isSelected };
  },
});
</script>

<style scoped>
/* Estilo del contenedor de la tarjeta */
.card {
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  background: linear-gradient(145deg, #79f281, #ff7bb2);
  border-radius: 15px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.6s, background-color 0.6s, opacity 0.6s;
  transform-style: preserve-3d;

}

.card.flipped {
  animation: flipCard 0.6s forwards;
  background: none;
   /* El fondo desaparece cuando la tarjeta se voltea */
}

.card-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  margin: 0;
  padding: 0;
}

.card-text {
  font-size: 2rem;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

/* Efecto de hover */
.card:hover {
  box-shadow: 0px 0px 20px 10px rgba(153, 128, 242, 0.8);
  transform: scale(1.05);
}

/* Animación cuando la tarjeta se voltea */
@keyframes flipCard {
  0% {
    transform: rotateY(100deg);

  }
  50% {
    transform: rotateY(0deg);

  }
  100% {
    transform: rotateY(0deg);

  }
}

.card.flipped {
  animation: flipCard 0.9s ease-in-out forwards;
  /* Duración de 0.9s y suavizado con ease-in-out */
}
</style>
