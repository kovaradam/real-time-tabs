import { writable } from 'svelte/store';
import { audioRecorder } from '../audio/recorder';
import { audioPlayer } from '../audio/player';
import { setRecordedAudioSource } from './utils';
import textContent from '../data/text-content';
import type { InputEvent } from '../utils/interfaces';

export const recordedAudioURL = writable('');
export const recordedAudioName = writable(textContent.audioFiles.defaultRecoredAudioName);
export const recordedAudioDuration = writable(0);

export function uploadAudioFile(event: InputEvent) {
  const file = event.target.files[0];
  const URL = window.URL.createObjectURL(file);
  setRecordedAudioName(file.name);
  setRecordedAudioURL(URL);
}

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

export function setRecordedAudioName(name: string) {
  recordedAudioName.set(name);
}

function deleteRecording() {
  audioRecorder.deleteRecordedAudioURL();
  audioPlayer?.deleteRecordedAudioURL();
}
