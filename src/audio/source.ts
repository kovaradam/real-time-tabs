import { setRecorderStatusContent, stopAudioPlayback } from '../stores/player';

export abstract class AudioSource {
  abstract start: () => void;
  abstract stop: () => void;
  abstract pause: () => void;
  abstract getDuration: () => number;
  abstract getCurrentTime: () => number;
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
  stop = () => this.oscillator.disconnect();
  pause = this.stop;
  getDuration = () => Infinity;
  getCurrentTime = () => Infinity;
}

export class RecordedAudioSource implements AudioSource {
  private static instance: RecordedAudioSource = null;

  private constructor(
    private audioContext: AudioContext = null,
    private gainNode: GainNode = null,
    private source: MediaElementAudioSourceNode = null,
    private audioElement: HTMLAudioElement = null,
    private connected = false,
  ) {
    this.audioElement = new Audio();
    this.audioElement.src = '';
    this.audioElement.onloadeddata = () =>
      setRecorderStatusContent(`Recorded audio duration: ${this.audioElement.duration}`);
    this.audioElement.onended = () => stopAudioPlayback();
  }

  static getInstance = () => {
    if (RecordedAudioSource.instance === null) {
      RecordedAudioSource.instance = new RecordedAudioSource();
    }
    return RecordedAudioSource.instance;
  };

  createSource = (audioContext: AudioContext, gainNode: GainNode) => {
    if (!this.connected) {
      this.audioContext = audioContext;
      this.gainNode = gainNode;
      this.source = audioContext.createMediaElementSource(this.audioElement);
      this.source.connect(this.gainNode).connect(this.audioContext.destination);
      this.connected = true;
    }
    return this;
  };

  getRecordedAudioUrl = () => this.audioElement.src;

  setRecordedAudioUrl = (URL: string) => {
    this.audioElement.setAttribute('src', URL);
    this.audioElement.load();
  };

  getDuration = () => this.audioElement.duration;

  getCurrentTime = () => this.audioElement.currentTime;

  start = () => {
    if (this.audioElement.src === '') {
      return false;
    }
    this.audioElement.play();
    return true;
  };

  stop = () => {
    this.audioElement.pause();
    this.audioElement.currentTime = 0;
  };

  pause = () => this.audioElement.pause();
}

export const recordedAudioSource = RecordedAudioSource.getInstance();
