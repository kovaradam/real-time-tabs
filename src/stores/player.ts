import { writable } from 'svelte/store';
import AudioPlayer from '../audio/player';
import { setHelpContent } from './help-content';
import textContent from '../data/text-content';

const defaultRecorderPlayerSettings = {
  isSoundOn: true,
  volume: 50,
};

export const isAudioPlayback = writable(false);
export const playerSettings = writable(defaultRecorderPlayerSettings);
export const currentTime = writable(0);

playerSettings.subscribe(({ volume }) => {
  AudioPlayer.setVolume(volume);
});

export function setCurrentTime(time: number) {
  currentTime.set(time);
}

export function setAudioCurrentTime(time: number) {
  AudioPlayer.setCurrentTime(time);
}

export function setIsAudioPlayback(isStart: boolean) {
  if (isStart) {
    isStart = AudioPlayer.start();
    if (!isStart) {
      setHelpContent(textContent.error.noFileToPlay, true);
    }
  } else {
    AudioPlayer.pause();
  }
  isAudioPlayback.set(isStart);
}

export function stopAudioPlayback() {
  AudioPlayer.stop();
  isAudioPlayback.set(false);
}
