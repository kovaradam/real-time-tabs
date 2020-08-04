
export abstract class AudioSource {
  abstract start: () => void;
  abstract stop: () => void;
  static createSource: AudioSourceFactory;
}

export type AudioSourceFactory = (audioContext: AudioContext, audioDestination: AudioNode) => AudioSource;

export class OscillatorSource implements AudioSource {
  private constructor(
    private audioContext: AudioContext,
    private gainNode: GainNode,
    private oscillator: OscillatorNode = null,
  ) {
    this.audioContext = audioContext;
    this.gainNode = gainNode;
    this.oscillator = this.audioContext.createOscillator();
    this.oscillator.frequency.value = 440;
    this.oscillator.start();
  }

  static createSource = (audioContext: AudioContext, gainNode: GainNode) => {
    return new OscillatorSource(audioContext, gainNode);
  };

  start = () => {
    return this.oscillator.connect(this.gainNode).connect(this.audioContext.destination);
  };
  stop = () => {
    return this.oscillator.disconnect();
  };
}
