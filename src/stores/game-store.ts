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
  firstCard: Card | null;
  secondCard: Card | null;
  gameMode: string;
  hintAvailable: boolean;  // Indica si las pistas están disponibles

}

export const useGameStore = defineStore('gameStore', {
  state: (): GameState => ({
    cards: [],
    score: 0,
    matchedPairs: 0,
    firstCard: null,
    secondCard: null,
    gameMode: 'Katakana',
    hintAvailable: true,
  }),

  actions: {
    initializeGame(mode: string) {
      this.gameMode = mode;
      this.score = 0;
      this.matchedPairs = 0;
      this.firstCard = null;
      this.secondCard = null;
      this.hintAvailable = true;

      const baseCharacters =[
        'A', 'Ba', 'Be', 'Bi', 'Bo', 'Bu', 'Bya', 'Byo', 'Byu', 'Cha', 'Chi', 'Cho', 'Chu', 'Da', 'De', 'Dji', 'Do', 'Dzu',
        'E', 'Fu', 'Ga', 'Ge', 'Gi', 'Go', 'Gu', 'Gya', 'Gyo', 'Gyu', 'Ha', 'He', 'Hi', 'Ho', 'Hya', 'Hyo', 'Hyu', 'I', 'Ja', 'Jo',
        'Jo', 'Ju', 'Ka', 'Ke', 'Ki', 'Ko', 'Ku', 'Kya', 'Kyo', 'Kyu', 'Ma', 'Me', 'Mi', 'Mo', 'Mu', 'Mya', 'Myo', 'Myu', 'Na', 'Ne',
       'Ni', 'No', 'Nu', 'N', 'Nya', 'Nyo', 'Nyu', 'O', 'Pa', 'Pe', 'Pi', 'Po', 'Pu', 'Pya', 'Pyo', 'Pyu', 'Ra', 'Re', 'Ri',
        'Ro', 'Ru', 'Rya', 'Ryo', 'Ryu', 'Sa', 'Se', 'Sha', 'Shi', 'Sho', 'Shu', 'So', 'Su', 'Ta', 'Te', 'To', 'Tsu', 'U', 'Wa',
        'Wo', 'Ya', 'Yo', 'Yu', 'Za', 'Ze', 'Zji', 'Zo', 'Zu'
      ];
      const characterCards: Card[] = baseCharacters.map((char, index) => ({
        id: index,
        value: `Char_${char}${mode}`,
        flipped: false,
        matched: false,
      }));

      const romajiCards: Card[] = baseCharacters.map((char, index) => ({
        id: index + baseCharacters.length,
        value: `Romaji_${char}`,
        flipped: false,
        matched: false,
      }));

      this.cards = [...characterCards, ...romajiCards].sort(() => Math.random() - 0.5);
    },

    flipCard(card: Card) {
      if (card.matched || card.flipped) return; // No hacer nada si ya está emparejada o volteada

      card.flipped = true;

      if (!this.firstCard) {
        this.firstCard = card;
      } else if (!this.secondCard) {
        this.secondCard = card;

        // Verificar si forman un par
        if (this.isMatch(this.firstCard, this.secondCard)) {
          this.matchCards(this.firstCard, this.secondCard);
        } else {
          // Aquí ponemos un timeout para voltear las cartas si no coinciden
          setTimeout(() => {
            if (this.firstCard) this.firstCard.flipped = false;
            if (this.secondCard) this.secondCard.flipped = false;
            this.firstCard = null;
            this.secondCard = null;
          }, 1000); // Voltear después de 1 segundo si no coinciden
        }
      }
    },

    isMatch(card1: Card, card2: Card): boolean {
      // Compara el valor de las dos cartas (una en el modo actual y la otra en romaji)
      const card1Value = card1.value.replace('Char_', '').replace(this.gameMode, '');
      const card2Value = card2.value.replace('Romaji_', '');
      return card1Value === card2Value;
    },


    matchCards(card1: Card, card2: Card) {
      card1.matched = true;
      card2.matched = true;
      this.matchedPairs++;
      this.addScore(10);
      console.log('Score actualizado:', this.score);

      this.firstCard = null;
      this.secondCard = null;
    },

    addScore(points: number) {
      this.score += points;
      console.log('Score actualizado:', this.score);
    },

    revealHint() {
      // Evita usar la pista más de una vez

      // Revelar todas las cartas temporalmente
      this.cards.forEach(card => {
        if (!card.matched) card.flipped = true;
      });

      setTimeout(() => {
        this.cards.forEach(card => {
          if (!card.matched) card.flipped = false;
        });
        this.hintAvailable = false;  // Desactivar la pista después de usarla
      }, 9000);
    },



    resetGame() {
      this.initializeGame(this.gameMode);
    },
  },
});
