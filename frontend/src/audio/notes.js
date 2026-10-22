const NOTE_REGEX = /^([A-Ga-g])(#|b)?(-?\d+)$/;
const SEMITONES_FROM_C = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

// 'A4' -> número MIDI (69). C4 (Dó central) = 60.
export function noteToMidi(note) {
  const match = NOTE_REGEX.exec(note.trim());
  if (!match) throw new Error(`Nota inválida: "${note}"`);
  const [, letter, accidental, octaveStr] = match;

  let semitone = SEMITONES_FROM_C[letter.toUpperCase()];
  if (accidental === '#') semitone += 1;
  if (accidental === 'b') semitone -= 1;

  return (Number(octaveStr) + 1) * 12 + semitone;
}

// Número MIDI -> frequência em Hz (A4 = 440 Hz é a referência padrão).
export function midiToFreq(midiNumber) {
  return 440 * Math.pow(2, (midiNumber - 69) / 12);
}

export function noteToFreq(note) {
  return midiToFreq(noteToMidi(note));
}