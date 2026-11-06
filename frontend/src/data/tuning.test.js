import { describe, it, expect } from 'vitest';
import { GUITAR_STRINGS, REFERENCE_NOTE, C_OCTAVE, formatHz } from './tuning.js';
import { noteToFreq } from '../audio/notes.js';

describe('afinação padrão do violão', () => {
  // Frequências de referência da afinação padrão (valores conhecidos, em Hz).
  const expectedHz = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63];

  it('tem as 6 cordas, da 6ª para a 1ª', () => {
    expect(GUITAR_STRINGS.map((item) => item.string)).toEqual([6, 5, 4, 3, 2, 1]);
  });

  it('cada corda soa na frequência-padrão', () => {
    GUITAR_STRINGS.forEach((item, index) => {
      expect(noteToFreq(item.note)).toBeCloseTo(expectedHz[index], 1);
    });
  });

  it('as notas ficam cada vez mais agudas, da corda mais grossa para a mais fina', () => {
    const freqs = GUITAR_STRINGS.map((item) => noteToFreq(item.note));
    const sorted = [...freqs].sort((a, b) => a - b);
    expect(freqs).toEqual(sorted);
  });

  it('a 1ª e a 6ª cordas são a mesma nota (Mi), com duas oitavas de distância', () => {
    const first = GUITAR_STRINGS.find((item) => item.string === 1);
    const sixth = GUITAR_STRINGS.find((item) => item.string === 6);
    expect(first.name).toBe(sixth.name);
    expect(noteToFreq(first.note) / noteToFreq(sixth.note)).toBeCloseTo(4, 5);
  });
});

describe('notas de referência', () => {
  it('Lá de referência vale 440 Hz', () => {
    expect(noteToFreq(REFERENCE_NOTE.note)).toBeCloseTo(440, 5);
  });

  it('a oitava de Dó tem 7 notas em ordem crescente, começando no Dó central', () => {
    expect(C_OCTAVE.map((item) => item.name)).toEqual(['Dó', 'Ré', 'Mi', 'Fá', 'Sol', 'Lá', 'Si']);
    const freqs = C_OCTAVE.map((item) => noteToFreq(item.note));
    expect([...freqs].sort((a, b) => a - b)).toEqual(freqs);
    expect(freqs[0]).toBeCloseTo(261.63, 1);
  });
});

describe('formatHz', () => {
  it('formata com vírgula e uma casa decimal', () => {
    expect(formatHz('E2')).toBe('82,4');
    expect(formatHz('A2')).toBe('110,0');
    expect(formatHz('A4')).toBe('440,0');
  });
});