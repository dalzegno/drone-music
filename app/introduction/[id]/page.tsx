import DroneContainer from "@/components/ui/drone-container";
import DroneIntroContainer from "@/components/ui/drone-intro-container";
import Pagination from "@/components/ui/pagination";
import { introductionDrones } from "@/data/drones/introduction-drones.json";
import { introductionTexts } from "@/data/texts/introduction-texts.json";
import { Search } from "lucide-react";
import { drones } from "@/data/drones/drones.json";

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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="font-bold text-3xl  text-center">{text?.title}</h1>

      {text?.text.map((t, index) => (
        <p className="py-2" key={index}>
          {t}
        </p>
      ))}
      {text?.links ? (
        <Link
          target="_blank"
          className="font-semibold text-blue-400 -4"
          href={`${text?.links}`}
        >
          Click here to learn more <Search className="inline"></Search>
        </Link>
      ) : (
        <></>
      )}
      {+id > 1 && +id < 6 ? (
        <DroneIntroContainer
          fundamentalFrequency={220}
          drone={drone}
        ></DroneIntroContainer>
      ) : +id > 5 ? (
        <DroneContainer
          fundamentalFrequency={220}
          drones={drones}
        ></DroneContainer>
      ) : (
        ""
      )}
      <Pagination totalPages={totalPages + 1} currentPage={+id}></Pagination>
    </div>
  );
}
