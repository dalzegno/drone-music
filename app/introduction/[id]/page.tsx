import DroneContainer from "@/components/ui/drone-container";
import DroneIntroContainer from "@/components/ui/drone-intro-container";
import Pagination from "@/components/ui/pagination";
import { introductionDrones } from "@/data/drones/introduction-drones.json";
import { introductionTexts } from "@/data/texts/introduction-texts.json";

import { Drone } from "@/lib/types";
import Link from "next/link";

export default async function IntroductionPage({
  params,
}: PageProps<"/introduction/[id]">) {
  const { id } = await params;
  const drone = introductionDrones.find((d) => d.id === +id) as Drone;
  const text = introductionTexts.find((t) => t.id === +id);

  const totalPages = introductionDrones.length;

  return (
    <div>
      <h1>{text?.title}</h1>
      <p>
        {text?.text.map((t, index) => (
          <p key={index}>{t}</p>
        ))}
      </p>
      {+id > 1 ? (
        <DroneIntroContainer
          fundamentalFrequency={110}
          drone={drone}
        ></DroneIntroContainer>
      ) : (
        ""
      )}
      <Pagination totalPages={totalPages} currentPage={+id}></Pagination>
    </div>
  );
}
