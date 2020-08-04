import type { AudioSource } from './source';
import type { AudioSourceFactory } from './source';

class AudioPlayer {
  private static instance: AudioPlayer = null;
  private audioContext: AudioContext = null;
  private gainNode: GainNode = null;
  private audioSource: AudioSource = null;
  private constructor() {}

  static createInstance = () => {
    if (AudioPlayer.instance !== null) return null;
    return new AudioPlayer();
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
    this.audioContext = new AudioContext();
    this.gainNode = this.audioContext.createGain();
  };
}

const instance = AudioPlayer.createInstance();

export default instance;
