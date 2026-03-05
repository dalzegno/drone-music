"use client";
import { getAudioContext } from "@/audio-context/singletons/audioContext";
import Link from "next/link";

export default function InitAudioContext() {
  return (
    <Link
      href="/introduction"
      onClick={() => {
        const audioContext = getAudioContext();
      }}
    >
      Turn sound on!
    </Link>
  );
}
