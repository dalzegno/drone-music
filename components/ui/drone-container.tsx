"use client";

import { Drone } from "@/lib/types";
import DroneNote from "./drone-note";
import { useState } from "react";

export default function DroneContainer({
  fundamentalFrequency,
  drone,
}: {
  fundamentalFrequency: number;
  drone: Drone;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div>
      {drone.notes.map((n, index) => (
        <DroneNote
          key={index}
          frequency={fundamentalFrequency * n.ratioNumber}
          isPlaying={isPlaying}
        ></DroneNote>
      ))}
      <button type="button" onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? <p>pause</p> : <p>play</p>}
      </button>
    </div>
  );
}
