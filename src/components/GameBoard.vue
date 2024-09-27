<script  lang="ts">
import { defineComponent } from 'vue';

import { useGameStore, Card  } from 'src/stores/game-store';
import MemoryCard from './MemoryCard.vue';
import { useRouter } from 'vue-router';




// gameStore.ts

export default defineComponent({
  components: { MemoryCard },
  setup() {

    const store = useGameStore();
    const router = useRouter();

    const flipCard= (card: Card ) => {

    store.flipCard(card);

    }

    const checkResults = () => {
      if(store.matchedPairs == 105 ) {
      router.push('/results');
      }
    }

    return{
      cards: store.cards,
      gameMode: store.gameMode,
      flipCard,
      checkResults,
    }

  },


});

</script>

<template>
  <q-layout view="1Hh Lpr 1Ff">

<q-page-container>
  <q-page>
    <q-toolbar>
     <q-toolbar-tittle>
      {{ gameMode }} - Juego de Memoria / 記憶ゲーム </q-toolbar-tittle>
    </q-toolbar>

    <div class="q-pa-md grid" >
      <MemoryCard
      v-for="card in cards"
      :key="card.id"
      :card="card"
      @flip="flipCard(card)"
      />
    </div>
    <q-btn @click="checkResults" label="Finalizar Juego " class="q-mt-md"/>
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
</style>
