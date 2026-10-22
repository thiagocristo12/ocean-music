import { useState, useCallback, useRef, useEffect } from 'react';
import * as audioEngine from '../audio/audioEngine.js';

export function usePlayNote() {
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutRef = useRef(null);

  const play = useCallback(async (note, options = {}) => {
    const duration = options.duration ?? 1;
    setIsPlaying(true);
    if (Array.isArray(note)) {
      await audioEngine.playChord(note, options);
    } else {
      await audioEngine.playNote(note, options);
    }
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsPlaying(false), duration * 1000);
  }, []);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return { play, isPlaying };
}

export function useMetronome() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeBeat, setActiveBeat] = useState(null);

  const start = useCallback(async (bpm, beatsPerBar = 4) => {
    await audioEngine.startMetronome({
      bpm,
      beatsPerBar,
      onBeat: (beatIndex) => setActiveBeat(beatIndex),
    });
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    audioEngine.stopMetronome();
    setIsRunning(false);
    setActiveBeat(null);
  }, []);

  // Para o som se o componente sumir da tela (ex.: usuário navega embora)
  useEffect(() => () => audioEngine.stopMetronome(), []);

  return { isRunning, activeBeat, start, stop };
}