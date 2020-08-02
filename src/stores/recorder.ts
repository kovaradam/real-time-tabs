import { writable } from 'svelte/store';
import { toggleStoreAttribute, setStoreAttribute } from '../utils/store-utils';

const defaultRecorderState = {
  isRecording: false,
  isPlayback: false,
};

const defaultRecorderSettings = {
  isMetronomeOn: false,
  isSoundOn: true,
  isMicrophoneOn: false,
  isCountInOn: false,
  bpm: 110,
  timeSignature: { upper: 4, lower: 4 },
  volume: 50,
};

export const recorderState = writable(defaultRecorderState);

export const recorderSettings = writable(defaultRecorderSettings);

export const changeTimeSignature = (event: KeyboardEvent, type: 'upper' | 'lower') => {
  if (event.key === 'ArrowUp') {
    recorderSettings.update(prevState => {
      prevState.timeSignature[type] += 1;
      return prevState;
    });
  }
  if (event.key === 'ArrowDown') {
    recorderSettings.update(prevState => {
      prevState.timeSignature[type] -= prevState.timeSignature[type] > 1 ? 1 : 0;
      return prevState;
    });
  }
};

export const changeBPM = (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    recorderSettings.update(prevState => {
      prevState.bpm += 1;
      return prevState;
    });
  }
  if (event.key === 'ArrowDown') {
    recorderSettings.update(prevState => {
      prevState.bpm -= prevState.bpm > 1 ? 1 : 0;
      return prevState;
    });
  }
};

export const setIsPlayback = (isPlayback: boolean) => {
  setStoreAttribute(recorderState, 'isPlayback', isPlayback)
};

export const setIsRecording = (isRecording: boolean) => {
  setStoreAttribute(recorderState, 'isRecording', isRecording)
};


export const toggleMetronome = () => {
  toggleStoreAttribute(recorderSettings, 'isMetronomeOn')
};

export const toggleSound = () => {
  toggleStoreAttribute(recorderSettings, 'isSoundOn')
};

export const toggleMicrophone = () => {
  toggleStoreAttribute(recorderSettings, 'isMicrophoneOn')
};

export const toggleCountIn = () => {
  toggleStoreAttribute(recorderSettings, 'isCountInOn')
};
