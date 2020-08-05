import type { AudioSource } from './source';
import type { AudioSourceFactory } from './source';
import { AudioContextSingleton } from './context';

class AudioPlayer {
  private static instance: AudioPlayer = null;

  private constructor(
    private audioContext: AudioContext = null,
    private gainNode: GainNode = null,
    private audioSource: AudioSource = null,
  ) {}

  static getInstance = () => {
    if (AudioPlayer.instance === null) {
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

  stop = () => {
    this.audioSource?.stop();
  };

  setVolume = (value: number) => {
    if (this.gainNode !== null) {
      const normalised = value / 50;
      this.gainNode.gain.value = normalised;
    }
  };

  setAudioSource = (audioSourceFactory: AudioSourceFactory) => {
    if (this.audioContext === null) {
      this.setAudioDestination();
    }
    this.audioSource = audioSourceFactory(this.audioContext, this.gainNode);
  };

  getSource = () => {
    return this.audioSource;
  };

  private setAudioDestination = () => {
    this.audioContext = AudioContextSingleton.getInstance();
    this.gainNode = this.audioContext.createGain();
  };
}

const instance = AudioPlayer.getInstance();

export default instance;
