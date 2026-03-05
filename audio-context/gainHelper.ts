import { getAudioContext } from "./singletons/audioContext";

export default class GainHelper {
  audioContext = getAudioContext() as AudioContext;
  public primaryGain = this.audioContext.createGain();
  InitializePrimaryGain(gain: number) {
    const now = this.audioContext.currentTime;
    this.primaryGain.gain.setValueAtTime(gain, now);
    this.primaryGain.connect(this.audioContext.destination);
  }

  CreateGainNode(isConnectToPrimaryGain: boolean): GainNode {
    const gainNode = this.audioContext.createGain();
    if (isConnectToPrimaryGain) {
      gainNode.connect(this.primaryGain);
    }
    return gainNode;
  }

  SetAdsrOnGainNode(
    maxGain: number,
    gainNode: GainNode,
    a: number,
    d?: number,
    s?: number,
    r?: number,
    oscillatorNode?: OscillatorNode,
  ) {
    const now = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(maxGain, now + a);
    if (!d || !s) {
      return;
    }
    gainNode.gain.linearRampToValueAtTime(s, now + a + d);
    if (!r) {
      return;
    }
    gainNode.gain.linearRampToValueAtTime(0, now + a + d + r);
    if (oscillatorNode !== undefined) {
      oscillatorNode.stop(now + a + d + r);
    }
  }
}
