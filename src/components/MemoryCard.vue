<template>
  <q-card
    @click="flip"
    :class="{
      'flipped': card?.flipped,
      'selected': isSelected,
      'matched': card?.matched
    }"
    class="card"
  >
    <q-card-section class="card-content" >
      <div v-if="card?.flipped || card?.matched" class="v-ripple.early">
        <!-- Aseguramos que la imagen ocupe el 100% del contenedor -->

        <img :src="getImageSrc(card.value)" class="v-ripple.early" />
      </div>
      <div v-else class="card-text">?</div>
    </q-card-section>
  </q-card>
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
  align-items: center;
  background: linear-gradient(145deg, #79f281, #ff7bb2);
  border-radius: 15px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  position: relative;
}

.card-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Estilo para la imagen */
.card-img {
  width: 100%;  /* Asegura que la imagen ocupe el 100% del ancho */
  height: 100%; /* Asegura que la imagen ocupe el 100% del alto */
  object-fit: cover; /* La imagen cubre todo el espacio, aunque recorte partes */
  transform: rotateY(0deg); /* Asegura que la imagen no se voltee */
}

/* Estado cuando la tarjeta está volteada */
.card.flipped {
  background: linear-gradient(145deg, #2e38ff, #ff7bb2);
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.4);
  transform: rotateY(180deg); /* Aplica animación de rotación cuando se voltea */
}

/* Efecto de hover */
.card:hover {
  box-shadow: 0px 0px 20px 10px rgba(153, 128, 242, 0.8);
  transform: scale(1.05);
}

/* Animación cuando la tarjeta se voltea */
@keyframes flipCard {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(180deg);
  }
}



</style>
