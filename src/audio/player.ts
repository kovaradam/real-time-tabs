import type { AudioSource } from './source';
import type { AudioSourceFactory } from './source';
import type { AudioContext as AudioContextInterface } from './model';
import AudioContext from './audio-context';
import { secondsToMinutesString } from './utils';

class AudioPlayer {
  private static instance: AudioPlayer;

  private constructor(
    private audioContext: AudioContextInterface = undefined,
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
    if (this.audioSource && this.isRecordedAudio()) {
      this.audioSource.start();
      return true;
    }
    return false;
  };

  stop = () => this.audioSource?.stop();

  pause = () => this.audioSource?.pause();

  getDuration = () => secondsToMinutesString(this.audioSource?.getDuration());

  getCurrentTime = () => secondsToMinutesString(this.audioSource?.getCurrentTime());

  setCurrentTime(time: number) {
    this.audioSource?.setCurrentTime(time);
  }

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
    this.audioContext = AudioContext.audioContextInstance;
    this.gainNode = this.audioContext.createGain();
  };

  isRecordedAudio = () => this.audioSource.isRecordedAudio();

  deleteRecordedAudioURL = () => this.audioSource?.deleteRecordedAudioURL();
}

export const audioPlayer = AudioPlayer.getInstance();
