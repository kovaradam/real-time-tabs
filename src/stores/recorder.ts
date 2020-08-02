import { writable } from 'svelte/store';
import { toggleStoreAttribute, setStoreAttribute } from '../utils/store-utils';


const defaultRecorderSettings = {
  isMetronomeOn: false,
  isMicrophoneOn: false,
  isCountInOn: false,
  bpm: 110,
  timeSignature: { upper: 4, lower: 4 },
};

export const recorderSettings = writable(defaultRecorderSettings);

export const setTimeSignatureState = (event: KeyboardEvent, type: 'upper' | 'lower') => {
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

export const setBPMState = (event: KeyboardEvent) => {
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

export const toggleMetronome = () => {
  toggleStoreAttribute(recorderSettings, 'isMetronomeOn')
};



export const toggleCountIn = () => {
  toggleStoreAttribute(recorderSettings, 'isCountInOn')
};
