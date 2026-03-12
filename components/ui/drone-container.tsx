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

  const [fundamental, setFundamental] = useState(fundamentalFrequency);

  return (
    <section className="w-full text-center">
      <select
        className="bg-amber-600 p-2 my-2 text-black"
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
      <div className="inline">
        <label htmlFor="fundamental-input" className="block">
          Fundamental frequency
        </label>
        <input
          id="fundamental-input"
          type="number"
          className="bg-amber-600 p-2 mx-2"
          defaultValue={fundamental}
          onChange={(e) => {
            setFundamental(+e.target.value);
          }}
        ></input>
      </div>
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
              frequency={fundamental * convertRatioToNumber(n.ratio as string)}
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
