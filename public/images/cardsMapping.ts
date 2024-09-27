// src/assets/cardsMapping.ts

export const baseCharacters = [
  'A', 'Ba', 'Be', 'Bi', 'Bo', 'Bu', 'Bya', 'Byo', 'Byu', 'Cha', 'Chi', 'Cho', 'Chu', 'Da', 'De', 'Dji', 'Do', 'Dzu',
  'E', 'Fu', 'Ga', 'Ge', 'Gi', 'Go', 'Gu', 'Gya', 'Gyo', 'Gyu', 'Ha', 'He', 'Hi', 'Ho', 'Hya', 'Hyo', 'Hyu', 'I', 'Ja',
  'Jo', 'Ju', 'Ka', 'Ke', 'Ki', 'Ko', 'Ku', 'Kya', 'Kyo', 'Kyu', 'Ma', 'Me', 'Mi', 'Mo', 'Mu', 'Mya', 'Myo', 'Myu', 'Na',
  'Ne', 'Ni', 'No', 'Nu', 'Nya', 'Nyo', 'Nyu', 'O', 'Pa', 'Pe', 'Pi', 'Po', 'Pu', 'Pya', 'Pyo', 'Pyu', 'Ra', 'Re', 'Ri',
  'Ro', 'Ru', 'Rya', 'Ryo', 'Ryu', 'Sa', 'Se', 'Sha', 'Shi', 'Sho', 'Shu', 'So', 'Su', 'Ta', 'Te', 'To', 'Tsu', 'U', 'Wa',
  'Wo', 'Ya', 'Yo', 'Yu', 'Za', 'Ze', 'Zji', 'Zo', 'Zu'
];

export const cardsMapping: { [key: string]: string } = {};

// Generar mapeo dinámico para Hiragana, Katakana y Romaji
baseCharacters.forEach(char => {
  cardsMapping[`Char_${char}Hiragana`] = new URL(`../assets/${char}Hiragana.png`, import.meta.url).href;
  cardsMapping[`Char_${char}Katakana`] = new URL(`../assets/${char}Katakana.png`, import.meta.url).href;
  cardsMapping[`Romaji_${char}`] = new URL(`../assets/${char}Romaji.png`, import.meta.url).href;
});

export default cardsMapping;
