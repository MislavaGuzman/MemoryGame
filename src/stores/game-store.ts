import { defineStore } from 'pinia';

export interface Card {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
}

interface GameState {
  cards: Card[];
  score: number;
  matchedPairs: number;
  gameMode: string;
}

export const useGameStore = defineStore('gameStore', {
  state: (): GameState => ({
    cards: [],
    score: 0,
    matchedPairs: 0,
    gameMode: 'Katakana', // Default mode
  }),

  actions: {
    initializeGame(mode: string) {
      this.gameMode = mode;
      this.score = 0;
      this.matchedPairs = 0;

      // Lista de nombres base (los caracteres en romaji para Hiragana y Katakana)
      const baseCharacters = [
        'A', 'Ba', 'Be', 'Bi', 'Bo', 'Bu', 'Bya', 'Byo', 'Byu', 'Cha', 'Chi', 'Cho', 'Chu', 'Da', 'De', 'Dji', 'Do', 'Dzu',
        'E', 'Fu', 'Ga', 'Ge', 'Gi', 'Go', 'Gu', 'Gya', 'Gyo', 'Gyu', 'Ha', 'He', 'Hi', 'Ho', 'Hya', 'Hyo', 'Hyu', 'I', 'Ja',
        'Jo', 'Ju', 'Ka', 'Ke', 'Ki', 'Ko', 'Ku', 'Kya', 'Kyo', 'Kyu', 'Ma', 'Me', 'Mi', 'Mo', 'Mu', 'Mya', 'Myo', 'Myu', 'Na',
        'Ne', 'Ni', 'No', 'Nu', 'Nya', 'Nyo', 'Nyu', 'O', 'Pa', 'Pe', 'Pi', 'Po', 'Pu', 'Pya', 'Pyo', 'Pyu', 'Ra', 'Re', 'Ri',
        'Ro', 'Ru', 'Rya', 'Ryo', 'Ryu', 'Sa', 'Se', 'Sha', 'Shi', 'Sho', 'Shu', 'So', 'Su', 'Ta', 'Te', 'To', 'Tsu', 'U', 'Wa',
        'Wo', 'Ya', 'Yo', 'Yu', 'Za', 'Ze', 'Zji', 'Zo', 'Zu'
      ];

      // Generar las cartas con Hiragana o Katakana + Romaji
      const characterCards: Card[] = baseCharacters.map((char, index) => ({
        id: index,
        value: `Char_${char}${mode}`, // Genera el valor con el modo seleccionado (Hiragana o Katakana)
        flipped: false,
        matched: false,
      }));

      const romajiCards: Card[] = baseCharacters.map((char, index) => ({
        id: index + baseCharacters.length,
        value: `Romaji_${char}`, // Genera el valor para Romaji
        flipped: false,
        matched: false,
      }));

      // Combinar las cartas y mezclarlas aleatoriamente
      this.cards = [...characterCards, ...romajiCards].sort(() => Math.random() - 0.5);
    },

    flipCard(card: Card) {
      // Voltear la carta
      card.flipped = !card.flipped;
    },

    matchCards(card1: Card, card2: Card) {
      // Marcar las cartas como emparejadas
      card1.matched = true;
      card2.matched = true;
      this.matchedPairs++;

      // Aumentar el puntaje
      this.score += 10;
    },

    resetGame() {
      // Reiniciar el juego con el mismo modo seleccionado
      this.initializeGame(this.gameMode);
    },
  },
});
