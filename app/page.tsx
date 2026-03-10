import InitAudioContext from "@/components/ui/init-audio-context";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen  bg-zinc-50 font-sans dark:bg-black">
      <main>
        <section className="py-16 px-4">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl leading-tight text-balance font-bold">
              Welcome to the wonderful world of drones in music!
            </h1>
            <p className="py-4">
              This website uses the built in{" "}
              <Link
                className="font-semibold text-blue-400"
                href={
                  "https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API"
                }
              >
                WebAudio API <Search className="inline"></Search>
              </Link>
              to play sounds in your browser.
            </p>
            <p className="max-w-2xl">
              If you want to listen to some nice sounds and learn more about
              tunings in different music traditions, click the button below to
              turn the sound on!
            </p>
            <p className="text-sm py-4">
              (you can change the volume by pressing the volume icon in the
              bottom right corner)
            </p>
            <InitAudioContext></InitAudioContext>
          </div>
        </section>
      </main>
    </div>
  );
}
