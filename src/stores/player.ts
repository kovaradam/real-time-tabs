import { writable } from 'svelte/store';

const defaultRecorderPlayerState = {
  isRecording: false,
  isPlayback: false,
};

const defaultRecorderPlayerSettings = {
  isSoundOn: true,
  volume: 50,
};

export const playerState = writable(defaultRecorderPlayerState);

export const playerSettings = writable(defaultRecorderPlayerSettings);

