"use client";

import { Drone } from "@/lib/types";
import { Scale } from "@/lib/types";
import DroneNote from "./drone-note";
import { useState } from "react";
import { convertRatioToNumber } from "@/utils/ratioConverter";
import { getAudioContext } from "@/audio-context/singletons/audioContext";

export default function DroneContainer({
  fundamentalFrequency,
  drones,
}: {
  fundamentalFrequency: number;
  drones: Drone[];
}) {
  const audioContext = getAudioContext() as AudioContext;
  const primaryGain = audioContext.createGain();
  primaryGain.gain.setValueAtTime(0.5, audioContext.currentTime);
  primaryGain.connect(audioContext.destination);

  const [isPlaying, setIsPlaying] = useState(false);
  const [firstPlayClicked, setFirstPlayClicked] = useState(false);

  const defaultDrone = drones.find((d) => d.id === 1) as Drone;
  const [selectedDrone, setSelectedDrone] = useState(defaultDrone);

  return (
    <section className="w-xl text-center">
      <select
        onChange={(e) => {
          setIsPlaying(false);
          const selectedOption = drones.find(
            (d) => d.id === +e.target.value,
          ) as Drone;
          setSelectedDrone(selectedOption);
        }}
      >
        {drones.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>
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
          {selectedDrone.notes.map((n, index) => (
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
        className="bg-amber-300 text-black p-1 rounded-sm cursor-pointer"
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
