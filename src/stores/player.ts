import { writable } from 'svelte/store';
import { audioPlayer } from '../audio/player';
import { microphone } from '../audio/microphone';
import { audioRecorder } from '../audio/recorder';
import { setIsMetronomeOn } from './recorder';

const defaultRecorderPlayerSettings = {
  isSoundOn: true,
  volume: 50,
};

export const isAudioPlayback = writable(false);

export const isRecording = writable(false);

export const playerSettings = writable(defaultRecorderPlayerSettings);

export const setIsAudioPlayback = (input: boolean) => {
  if (input) {
    input = audioPlayer.start();
  } else {
    audioPlayer.stop();
  }
  isAudioPlayback.set(input);
};

export const setIsRecording = (input: boolean) => {
  if (input) {
    input = audioRecorder.start();
  } else {
    audioRecorder.stop();
  }
  isRecording.set(input);
};

