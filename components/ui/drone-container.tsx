"use client";
import { useEffect, useState } from "react";
import GainHelper from "@/audio-context/gainHelper";
import OscillatorHelper from "@/audio-context/oscillatorHelper";
import { getAudioContext } from "@/audio-context/singletons/audioContext";
import { drones } from "@/data/drones/drones.json";
import type { Drone } from "@/lib/types";

const audioContext = getAudioContext() as AudioContext;
const oscHelper = new OscillatorHelper();
let oscillators: OscillatorNode[] = [];
let oscillator: OscillatorNode;

export default function DroneContainer({
  frequency,
  gainHelper,
}: {
  frequency: number;
  gainHelper: GainHelper;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const gain = gainHelper.CreateGainNode(true);
  gain.gain.setValueAtTime(0.5, 0);

  useEffect(() => {
    console.log(isPlaying);
    if (isPlaying) {
      const osc = oscHelper.CreateOscillatorNode(frequency);
      oscillators.push(osc);
      oscillator = osc;

      oscillator.connect(gain);
      oscillator.start();

      gainHelper.SetAdsrOnGainNode(1, gain, 0.1);
    } else if (!isPlaying) {
      if (oscillator !== undefined) {
        oscillator.stop(audioContext.currentTime + 0.1);
      }
      gain.gain.setValueAtTime(gain.gain.value, audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
      oscillators = [];
    }
  }, [isPlaying, frequency, gain, gainHelper]);

  return (
    <div>
      <button
        type="button"
        className="bg-amber-200 text-black"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? <p>Pause</p> : <p>Play</p>}
      </button>
    </div>
  );
}
