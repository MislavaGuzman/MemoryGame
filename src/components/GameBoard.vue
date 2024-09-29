<script  lang="ts">

import { defineComponent } from 'vue';

import { useGameStore, Card  } from 'src/stores/game-store';
import MemoryCard from './MemoryCard.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { MemoryCard },
  setup() {

    const store = useGameStore();
    const router = useRouter();


    const flipCard= (card: Card ) => {

    store.flipCard(card);

    }
    const restart = () => {
      store.resetGame();
      router.push('/'); // Vuelve al inicio para reiniciar el juego
    };


    const useHint = () => {
      store.revealHint();
    };

    return {
      cards: store.cards,
      gameMode: store.gameMode,
      flipCard,
      score: store.score,
      restart,
      useHint,
      hintAvailable: store.hintAvailable,
    };

  },


});

</script>

<template>
  <q-layout view="1Hh Lpr 1Ff">

<q-page-container>
  <q-page>

      <q-toolbar class="q-pa-sm">
          <!-- Título del juego -->
          <q-toolbar-title  class="q-ml-md q-mr-md">
            <p class="text-primary text-center">
              <!-- Para pantallas grandes (md y superiores) -->
              <span class="text-h3 q-mb-none q-hidden-sm-and-down">
                {{ gameMode }} - Juego de Memoria / 記憶ゲーム
              </span>
              <!-- Para pantallas pequeñas (sm y menores) -->

            </p>
          </q-toolbar-title>

          <!-- Puntuación -->
          <div class="q-mr-md">

          </div>

          <!-- Botón de reiniciar el juego -->
          <q-btn
            outline
            rounded
            color="info"
            @click="restart"
            label="Volver a Jugar"
            class="q-ml-md"
          />



        <!-- Botón de Pista -->
        <div class="q-pa-md">
          <q-btn
            outline
            rounded
            color="secondary"
            label="Usar Pista"
            @click="useHint"
            :disable="!hintAvailable"
          />
        </div>
        </q-toolbar>



    <div class="q-pa-md grid" >
      <MemoryCard
      v-for="card in cards"
      :key="card.id"
      :card="card"
      @flip="flipCard(card)"
      />
    </div>
    <div>
      <div class="q-pa-md">

    </div>
    </div>

  </q-page>
</q-page-container>
</q-layout>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(14, 1fr);
  gap: 10px;
}
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(14, 1fr);
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .grid {
    grid-template-columns: repeat(8, 1fr);
  }
}

@media (max-width: 767px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

</style>
