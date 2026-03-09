"use client";

import { Drone } from "@/lib/types";
import { Scale } from "@/lib/types";
import DroneNote from "./drone-note";
import { useState } from "react";
import { convertRatioToNumber } from "@/utils/ratioConverter";

export default function DroneContainer({
  fundamentalFrequency,
  drone,
}: {
  fundamentalFrequency: number;
  drone: Drone;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [firstPlayClicked, setFirstPlayClicked] = useState(false);
  return (
    <div>
      {drone.notes.map((n, index) => (
        <DroneNote
          key={index}
          note={n}
          frequency={
            fundamentalFrequency * convertRatioToNumber(n.ratio as string)
          }
          isPlaying={isPlaying}
          firstPlayClicked={firstPlayClicked}
        ></DroneNote>
      ))}
      <button
        type="button"
        onClick={() => {
          setIsPlaying(!isPlaying);
          setFirstPlayClicked(true);
        }}
      >
        {isPlaying ? <p>pause</p> : <p>play</p>}
      </button>
    </div>
  );
}
