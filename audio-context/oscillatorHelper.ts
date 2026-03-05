import { getAudioContext } from "./singletons/audioContext";

// import { GetPeriodicWaves } from "@/models/periodicWaves/periodicWaveCollection";
export default class OscillatorHelper {
  audioContext = getAudioContext() as AudioContext;

  CreateOscillatorNode(frequency: number, gainNode?: GainNode): OscillatorNode {
    const now = this.audioContext.currentTime;
    const oscillatorNode = this.audioContext.createOscillator();
    oscillatorNode.frequency.setValueAtTime(frequency, now);

    if (gainNode !== undefined) {
      oscillatorNode.connect(gainNode);
    }

    return oscillatorNode;
  }

  //TODO:import waveforms
  // SetTypeOscillator(oscillator: OscillatorNode, name: string) {
  //   const periodicWaves = GetPeriodicWaves(this.audioContext);
  //   const wave = periodicWaves.find((i) => i.name === name);
  //   if (wave) {
  //     oscillator.setPeriodicWave(wave.periodicWave);
  //   }
  // }
}
