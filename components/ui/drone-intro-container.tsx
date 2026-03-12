"use client";

import { Drone } from "@/lib/types";
import { Scale } from "@/lib/types";
import DroneNote from "./drone-note";
import { useState } from "react";
import { convertRatioToNumber } from "@/utils/ratioConverter";
import { getAudioContext } from "@/audio-context/singletons/audioContext";

export default function DroneIntroContainer({
  fundamentalFrequency,
  drone,
}: {
  fundamentalFrequency: number;
  drone: Drone;
}) {
  const audioContext = getAudioContext() as AudioContext;
  const primaryGain = audioContext.createGain();
  primaryGain.gain.setValueAtTime(0.5, audioContext.currentTime);
  primaryGain.connect(audioContext.destination);

  const [isPlaying, setIsPlaying] = useState(false);
  const [firstPlayClicked, setFirstPlayClicked] = useState(false);

  return (
    <section className="w-full text-center my-4">
      <table className="table-auto gap-4 bg-gray-400 w-full">
        <thead>
          <tr>
            <th>volume</th>
            <th>note name</th>
            <th>frequency</th>
            <th>ratio</th>
          </tr>
        </thead>
        <tbody>
          {drone.notes.map((n, index) => (
            <DroneNote
              key={index}
              primaryGain={primaryGain}
              note={n}
              frequency={
                fundamentalFrequency * convertRatioToNumber(n.ratio as string)
              }
              isPlaying={isPlaying}
              firstPlayClicked={firstPlayClicked}
            ></DroneNote>
          ))}
        </tbody>
      </table>
      <button
        className="bg-amber-300 text-black p-1 rounded-sm cursor-pointer my-4"
        type="button"
        onClick={() => {
          setIsPlaying(!isPlaying);
          setFirstPlayClicked(true);
        }}
      >
        {isPlaying ? <p>pause</p> : <p>play</p>}
      </button>
    </section>
  );
}
