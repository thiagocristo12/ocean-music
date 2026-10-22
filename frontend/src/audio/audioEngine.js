// Motor de áudio do Ocean Music: síntese por osciladores, sem nenhum
// arquivo de áudio externo (decisão D-86). Isolado de React — o hook
// useAudio.js é quem faz a ponte com os componentes.
import { noteToFreq } from './notes.js';

let audioContext = null;
let masterGain = null;
let metronomeTimerId = null;
let nextBeatTime = 0;
let currentBeat = 0;

function ensureContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioContext.createGain();
    masterGain.gain.value = 0.2; // volume moderado, evita sustos
    const compressor = audioContext.createDynamicsCompressor();
    masterGain.connect(compressor);
    compressor.connect(audioContext.destination);
  }
  return audioContext;
}

// SEMPRE chamado a partir de um gesto do usuário (clique) — navegadores
// bloqueiam áudio automático sem interação (decisão D-87).
export async function resume() {
  const context = ensureContext();
  if (context.state === 'suspended') {
    await context.resume();
  }
  return context;
}

function scheduleNote(frequency, startTime, duration, type = 'triangle') {
  const context = ensureContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.value = frequency;

  // Envelope simples (ataque/liberação) para evitar "cliques" no som
  const attack = 0.015;
  const release = 0.08;
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(1, startTime + attack);
  gain.gain.setValueAtTime(1, startTime + duration - release);
  gain.gain.linearRampToValueAtTime(0, startTime + duration);

  oscillator.connect(gain);
  gain.connect(masterGain);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.02);
}

export async function playNote(note, { duration = 1, type = 'triangle' } = {}) {
  const context = await resume();
  const frequency = typeof note === 'number' ? note : noteToFreq(note);
  scheduleNote(frequency, context.currentTime, duration, type);
}

export async function playChord(notes, { duration = 1.2, type = 'triangle' } = {}) {
  const context = await resume();
  notes.forEach((note) => {
    const frequency = typeof note === 'number' ? note : noteToFreq(note);
    scheduleNote(frequency, context.currentTime, duration, type);
  });
}

function scheduleClick(time, isAccent) {
  const context = ensureContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = 'square';
  oscillator.frequency.value = isAccent ? 1500 : 1000;
  gain.gain.setValueAtTime(0.6, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

  oscillator.connect(gain);
  gain.connect(masterGain);
  oscillator.start(time);
  oscillator.stop(time + 0.06);
}

// Metrônomo com "look-ahead scheduling" (decisão D-88): agenda os cliques
// usando o relógio do próprio AudioContext, sempre um pouco à frente do
// tempo real — muito mais preciso que confiar em setTimeout/setInterval
// puro, que têm atraso imprevisível.
export async function startMetronome({ bpm, beatsPerBar = 4, onBeat }) {
  const context = await resume();
  stopMetronome();

  const secondsPerBeat = 60 / bpm;
  nextBeatTime = context.currentTime + 0.05;
  currentBeat = 0;

  function scheduler() {
    while (nextBeatTime < context.currentTime + 0.1) {
      const beatIndex = currentBeat % beatsPerBar;
      scheduleClick(nextBeatTime, beatIndex === 0);

      if (onBeat) {
        const delayMs = Math.max(0, (nextBeatTime - context.currentTime) * 1000);
        setTimeout(() => onBeat(beatIndex), delayMs);
      }

      nextBeatTime += secondsPerBeat;
      currentBeat += 1;
    }
  }

  scheduler();
  metronomeTimerId = setInterval(scheduler, 25);
}

export function stopMetronome() {
  if (metronomeTimerId) {
    clearInterval(metronomeTimerId);
    metronomeTimerId = null;
  }
}