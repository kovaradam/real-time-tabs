import { writable } from 'svelte/store';
import { audioRecorder } from '../audio/recorder';

export const recordedAudioURL = writable('');

export const setRecordedAudioURL = (URL: string) => {
  recordedAudioURL.set(URL);
  if (URL === '') audioRecorder.deleteRecordedAudioURL();
};
