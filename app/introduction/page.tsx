import DroneContainer from "@/components/ui/drone-container";
import { drones } from "@/data/drones/drones.json";
import { scales } from "@/data/scales/scales.json";
import type { Drone } from "@/lib/types";

export default function Introduction() {
  const fundamentalFrequency = 110;

  return (
    <div className="flex min-h-screen items-center justify-center flex-col">
      <p>Musical drones are long sustained notes</p>
      <p>here's an example ffs</p>

      <DroneContainer
        fundamentalFrequency={fundamentalFrequency}
        drones={drones}
      ></DroneContainer>
    </div>
  );
}
