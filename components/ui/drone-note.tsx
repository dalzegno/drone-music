"use client";

import { getAudioContext } from "@/audio-context/singletons/audioContext";
import { useEffect, useState } from "react";

const audioContext = getAudioContext() as AudioContext;
let oscillators: OscillatorNode[] = [];
const primaryGain = audioContext.createGain();
primaryGain.gain.setValueAtTime(0.5, audioContext.currentTime);
primaryGain.connect(audioContext.destination);

export default function DroneNote({
  frequency,
  isPlaying,
}: {
  frequency: number;
  isPlaying: boolean;
}) {
  const [volume, setVolume] = useState(0.5);

  const gainNode = audioContext.createGain();
  gainNode.connect(primaryGain);

  useEffect(() => {
    if (isPlaying) {
      let oscillator = audioContext.createOscillator();
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

      oscillator.connect(gainNode);
      oscillator.start();

      oscillators.push(oscillator);
    } else if (!isPlaying) {
      oscillators.forEach((o) => {
        o.stop();
      });
      oscillators = [];
    }
  }, [isPlaying, frequency, gainNode]);

  useEffect(() => {
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
  }, [volume, gainNode]);

  return (
    <div>
      <input
        type="range"
        min="0"
        max="100"
        onChange={(e) => setVolume(+e.target.value / 100)}
      ></input>
    </div>
  );
}
