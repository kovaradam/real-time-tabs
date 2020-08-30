import { writable } from 'svelte/store';
import { audioRecorder } from '../audio/recorder';
import { audioPlayer } from '../audio/player';
import { setRecordedAudioSource } from './utils';

export const recordedAudioURL = writable('');
export const recordedAudioDuration = writable(0);

export function setRecordedAudioURL(URL: string) {
  recordedAudioURL.set(URL);
  if (URL === '') {
    deleteRecording();
  } else {
    setRecordedAudioSource(URL);
  }
}

export function setRecordedAudioDuration(duration: number) {
  recordedAudioDuration.set(duration);
}

function deleteRecording() {
  audioRecorder.deleteRecordedAudioURL();
  audioPlayer?.deleteRecordedAudioURL();
}

