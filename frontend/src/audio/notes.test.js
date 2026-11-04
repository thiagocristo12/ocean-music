import { describe, it, expect } from 'vitest';
import { noteToMidi, midiToFreq, noteToFreq } from './notes.js';

describe('noteToMidi', () => {
  it('converte notas naturais (Dó central = 60, Lá 4 = 69)', () => {
    expect(noteToMidi('C4')).toBe(60);
    expect(noteToMidi('E4')).toBe(64);
    expect(noteToMidi('A4')).toBe(69);
  });

  it('entende sustenido e bemol como a mesma nota', () => {
    expect(noteToMidi('C#4')).toBe(61);
    expect(noteToMidi('Db4')).toBe(61);
    expect(noteToMidi('Bb3')).toBe(58);
  });

  it('aceita letra minúscula', () => {
    expect(noteToMidi('a4')).toBe(69);
  });

  it('lança erro para nota inválida', () => {
    expect(() => noteToMidi('H4')).toThrow();
    expect(() => noteToMidi('A')).toThrow();
  });
});

describe('midiToFreq / noteToFreq', () => {
  it('Lá 4 vale 440 Hz e Lá 5 vale 880 Hz (uma oitava = o dobro)', () => {
    expect(midiToFreq(69)).toBe(440);
    expect(midiToFreq(81)).toBeCloseTo(880, 5);
  });

  it('Dó central vale cerca de 261,63 Hz', () => {
    expect(noteToFreq('C4')).toBeCloseTo(261.63, 1);
  });
});