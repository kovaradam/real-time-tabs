import type { AudioSource } from './source';
import type { AudioSourceFactory } from './source';
import AudioContext from './audio-context';
import { secondsToMinutesString } from './utils';

class AudioPlayer {
  private static gainNode: GainNode = undefined;
  private static audioSource: AudioSource = undefined;

  static start = () => {
    if (AudioPlayer.audioSource && AudioPlayer.isRecordedAudio()) {
      AudioPlayer.audioSource.start();
      return true;
    }
    return false;
  };

  static stop = () => {
    AudioPlayer.audioSource?.stop();
  };

  static pause = () => {
    AudioPlayer.audioSource?.pause();
  };

  static getDuration = () => {
    return secondsToMinutesString(AudioPlayer.audioSource?.getDuration());
  };

  static getCurrentTime = () => {
    return secondsToMinutesString(AudioPlayer.audioSource?.getCurrentTime());
  };

  static setCurrentTime(time: number) {
    AudioPlayer.audioSource?.setCurrentTime(time);
  }

  static setVolume = (value: number) => {
    if (AudioPlayer.gainNode) {
      const normalised = value / 50;
      AudioPlayer.gainNode.gain.value = normalised;
    }
  };

  static setAudioSource = (audioSourceFactory: AudioSourceFactory) => {
    if (AudioPlayer.gainNode === undefined) {
      AudioPlayer.createAudioDestination();
    }
    AudioPlayer.audioSource = audioSourceFactory(AudioContext.audioContextInstance, AudioPlayer.gainNode);
  };

  static getAudioSource = () => {
    return AudioPlayer.audioSource;
  };

  private static createAudioDestination = () => {
    AudioPlayer.gainNode = AudioContext.audioContextInstance.createGain();
  };

  static isRecordedAudio = () => {
    return AudioPlayer.audioSource.isRecordedAudio();
  };

  static deleteRecordedAudioURL = () => {
    AudioPlayer.audioSource?.deleteRecordedAudioURL();
  };
}

export default AudioPlayer;
