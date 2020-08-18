import { writable } from 'svelte/store';
import { audioPlayer } from '../audio/player';
import { audioRecorder } from '../audio/recorder';
import { recorderSettings } from './recorder';
import { getStoreAttribute } from '../utils/store-utils';
import { setHelpContent } from './help-content';
import textContent from '../data/text-content';

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
  if (!input) {
    audioRecorder.stop();
    isRecording.set(false);
    return;
  } 
  if (getStoreAttribute(recorderSettings, 'isMicrophoneOn')) {
    input = audioRecorder.start();
    isRecording.set(input);
  } else {
    setHelpContent(textContent.error.microphoneOff, true);
  }
  
};

