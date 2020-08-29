import type { AudioSource } from './source';
import type { AudioSourceFactory } from './source';
import { AudioContextSingleton } from './context';

class AudioPlayer {
  private static instance: AudioPlayer;

  private constructor(
    private audioContext: AudioContext = undefined,
    private gainNode: GainNode = undefined,
    private audioSource: AudioSource = undefined,
  ) {}

  static getInstance = () => {
    if (AudioPlayer.instance === undefined) {
      AudioPlayer.instance = new AudioPlayer();
    }
    return AudioPlayer.instance;
  };

  start = () => {
    if (this.audioSource) {
      this.audioSource.start();
      return true;
    }
    return false;
  };

  stop = () => this.audioSource?.stop();
  
  pause = () => this.audioSource?.pause();

  getDuration = () => this.audioSource?.getDuration();
  
  getCurrentTime = () => this.audioSource?.getCurrentTime();
  
  setVolume = (value: number) => {
    if (this.gainNode) {
      const normalised = value / 50;
      this.gainNode.gain.value = normalised;
    }
  };

  setAudioSource = (audioSourceFactory: AudioSourceFactory) => {
    if (this.audioContext === undefined) {
      this.createAudioDestination();
    }
    this.audioSource = audioSourceFactory(this.audioContext, this.gainNode);
  };

  getAudioSource = () => {
    return this.audioSource;
  };

  private createAudioDestination = () => {
    this.audioContext = AudioContextSingleton.getInstance();
    this.gainNode = this.audioContext.createGain();
  };
}

export const audioPlayer = AudioPlayer.getInstance();