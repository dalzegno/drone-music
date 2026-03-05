import InitAudioContext from "@/components/ui/init-audio-context";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>
        <h1>Welcome to the wonderful world of drones in music!</h1>

        <p>
          If you want to listen to some nice sounds and learn more about tunings
          in different music traditions
        </p>
        <p>click the button below to turn the sound on!</p>
        <p>
          (you can change the volume by pressing the volume icon in the bottom
          right corner)
        </p>
        <InitAudioContext></InitAudioContext>
      </main>
    </div>
  );
}
