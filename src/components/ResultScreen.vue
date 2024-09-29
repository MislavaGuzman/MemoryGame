<template>
   <q-layout view="1Hh Lpr 1Ff">
    <q-page-container>
  <q-page>
    <q-toolbar>
      <q-toolbar-title text-h2 class="text-secondary">
       Resultados
      </q-toolbar-title>
    </q-toolbar>
    <div class="q-pa-md">
      <p text-h3 class="text-primary">Puntuación: {{ score }}</p>
      <q-btn outline rounded color="info" @click="restart" label="Volver a Jugar" />
    </div>
  </q-page>
    </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import { useGameStore } from '../stores/game-store';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useGameStore();
    const router = useRouter();

    const restart = () => {
      store.resetGame();
      router.push('/'); // Vuelve al inicio para reiniciar el juego
    };

    const shareScore = () => {
      const url = `https://twitter.com/intent/tweet?text=Mi puntuación fue: ${store.score}`;
      window.open(url, '_blank');
    };

    return {
      score: store.score,
      restart,
      shareScore,
    };
  },
};
</script>
