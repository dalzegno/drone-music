"use client";
import { useEffect, useState } from "react";
import GainHelper from "@/audio-context/gainHelper";
import OscillatorHelper from "@/audio-context/oscillatorHelper";
import { getAudioContext } from "@/audio-context/singletons/audioContext";
import { drones } from "@/data/drones/drones.json";
import { Drone } from "@/lib/types";

const audioContext = getAudioContext() as AudioContext;
const oscHelper = new OscillatorHelper();
const gainHelper = new GainHelper();

gainHelper.InitializePrimaryGain(0.5);

const gain = gainHelper.CreateGainNode(true);
gain.gain.setValueAtTime(0.5, 0);

let oscillators: OscillatorNode[] = [];
const fundamentalFrequency = 110;

export default function DroneContainer() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    console.log(isPlaying);

    if (isPlaying) {
      const selectedDrone = drones.find((d) => d.id === 1) as Drone;
      selectedDrone.notes.forEach((n) => {
        const osc = oscHelper.CreateOscillatorNode(
          fundamentalFrequency * n.ratioNumber,
        );
        oscillators.push(osc);
      });
      console.log(oscillators);
      oscillators.forEach((o) => {
        o.connect(gain);
        o.start();
      });
      gainHelper.SetAdsrOnGainNode(1, gain, 0.1);
    } else if (!isPlaying) {
      oscillators.forEach((o) => {
        o.stop(audioContext!.currentTime + 0.1);
      });
      gain.gain.setValueAtTime(gain.gain.value, audioContext!.currentTime);
      gain.gain.linearRampToValueAtTime(0, audioContext!.currentTime + 0.1);
      oscillators = [];
    }
  }, [isPlaying]);

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
