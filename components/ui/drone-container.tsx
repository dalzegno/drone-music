"use client";
import { useEffect, useState } from "react";
import GainHelper from "@/audio-context/gainHelper";
import OscillatorHelper from "@/audio-context/oscillatorHelper";
import { getAudioContext } from "@/audio-context/singletons/audioContext";

const audioContext = getAudioContext();
const oscHelper = new OscillatorHelper();
const gainHelper = new GainHelper();

gainHelper.InitializePrimaryGain(0.5);

const gain = gainHelper.CreateGainNode(true);

let oscillators: OscillatorNode[] = [];

export default function DroneContainer() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    console.log(isPlaying);
    if (isPlaying) {
      const oscillator = oscHelper.CreateOscillatorNode(200);
      oscillator.connect(gain);
      oscillator.start();
      oscillators.push(oscillator);
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
