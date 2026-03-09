"use client";
import GainHelper from "@/audio-context/gainHelper";
import DroneContainer from "@/components/ui/drone-container";
import { drones } from "@/data/drones/drones.json";
import type { Drone } from "@/lib/types";

export default function Introduction() {
  const selectedDrone = drones.find((d) => d.id === 1) as Drone;
  const fundamentalFrequency = 110;

  return (
    <div className="flex min-h-screen items-center justify-center flex-col">
      <p>Musical drones are long sustained notes</p>

      {selectedDrone.notes.map((n, index) => (
        <DroneContainer
          key={index}
          fundamentalFrequency={fundamentalFrequency}
        ></DroneContainer>
      ))}
    </div>
  );
}
