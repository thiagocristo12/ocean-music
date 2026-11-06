import { noteToFreq } from '../audio/notes.js';

// Cordas soltas do violão em afinação padrão, da mais grave (6ª) à mais aguda (1ª).
// As notas indicam a altura real do som que cada corda produz.
export const GUITAR_STRINGS = [
  { string: 6, name: 'Mi', note: 'E2' },
  { string: 5, name: 'Lá', note: 'A2' },
  { string: 4, name: 'Ré', note: 'D3' },
  { string: 3, name: 'Sol', note: 'G3' },
  { string: 2, name: 'Si', note: 'B3' },
  { string: 1, name: 'Mi', note: 'E4' },
];

// Lá 440 Hz: a referência internacional usada para afinar instrumentos.
export const REFERENCE_NOTE = { name: 'Lá', note: 'A4' };

// Notas naturais de uma oitava, a partir do Dó central.
export const C_OCTAVE = [
  { name: 'Dó', note: 'C4' },
  { name: 'Ré', note: 'D4' },
  { name: 'Mi', note: 'E4' },
  { name: 'Fá', note: 'F4' },
  { name: 'Sol', note: 'G4' },
  { name: 'Lá', note: 'A4' },
  { name: 'Si', note: 'B4' },
];

// Frequência formatada em português, com uma casa decimal (ex.: "82,4").
export function formatHz(note) {
  return noteToFreq(note).toLocaleString('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}