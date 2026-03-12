"use client";
import { getAudioContext } from "@/audio-context/singletons/audioContext";
import Link from "next/link";

export default function InitAudioContext() {
  return (
    <Link
      className="bg-amber-500 p-2 rounded-sm hover:bg-amber-600 transition-colors"
      href="/introduction/1"
      onClick={() => {
        const audioContext = getAudioContext();
      }}
    >
      Turn sound on!
    </Link>
  );
}
