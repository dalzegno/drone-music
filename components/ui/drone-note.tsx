"use client";

import { getAudioContext } from "@/audio-context/singletons/audioContext";
import { Note } from "@/lib/types";
import { useEffect, useState } from "react";

const audioContext = getAudioContext() as AudioContext;
let oscillators: OscillatorNode[] = [];

export default function DroneNote({
  primaryGain,
  note,
  frequency,
  isPlaying,
  firstPlayClicked,
}: {
  primaryGain: GainNode;
  note: Note;
  frequency: number;
  isPlaying: boolean;
  firstPlayClicked: boolean;
}) {
  const [volume, setVolume] = useState(0.5);

  const gainNode = audioContext.createGain();
  gainNode.connect(primaryGain);

  useEffect(() => {
    if (isPlaying) {
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        volume,
        audioContext.currentTime + 1,
      );
      let oscillator = audioContext.createOscillator();
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

      oscillator.connect(gainNode);
      oscillator.start();

      oscillators.push(oscillator);
    } else if (!isPlaying && firstPlayClicked) {
      gainNode.gain.setValueAtTime(
        gainNode.gain.value,
        audioContext.currentTime,
      );
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1);
      oscillators.forEach((o) => {
        o.stop(audioContext.currentTime + 1);
      });
      oscillators = [];
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      gainNode.gain.linearRampToValueAtTime(
        volume,
        audioContext.currentTime + 0.1,
      );
    }
  }, [volume]);

  return (
    <div className="flex">
      <p>{note.name}</p>
      <input
        type="range"
        min="0"
        max="100"
        onChange={(e) => {
          setVolume(+e.target.value / 100);
        }}
      ></input>
    </div>
  );
}
