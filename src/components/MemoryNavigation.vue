<script lang="ts">
import { useGameStore } from 'src/stores/game-store';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const gameStore = useGameStore();
    const router = useRouter();

    const selectMode = (mode: string) => {
      gameStore.initializeGame(mode);
      router.push('/game');
    };

    return {
      selectMode,
    };
  },
};

</script>






<template>
 <q-layout view="1Hh Lpr 1Ff">
  <q-page-container>
    <q-page>
     <q-toolbar>
      <q-toolbar-title  class="bg-primary text-white">
        記憶ゲーム
      </q-toolbar-title>
     </q-toolbar>


     <div class="q-pa-md q-gutter-sm">
      <q-btn outline rounded color="secondary" @click="selectMode('Hiragana')" label="ひらがな" class="full-width text-secondary text-h5" />
      <q-btn outline rounded color="accent" @click="selectMode('Katakana')" label="カタカナ" class="full-width text-accent text-h5" />


     </div>
  </q-page>
</q-page-container>
</q-layout>
  </template>
