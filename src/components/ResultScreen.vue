<template>
  <q-page>
    <q-toolbar>
      <q-toolbar-title>Resultados</q-toolbar-title>
    </q-toolbar>
    <div class="q-pa-md">
      <p>Puntuación: {{ score }}</p>
      <q-btn @click="restart" label="Volver a Jugar" />
      <q-btn @click="shareScore" label="Compartir en Redes Sociales" />
    </div>
  </q-page>
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
      router.push('/');
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
