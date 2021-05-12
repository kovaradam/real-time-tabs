import { writable } from 'svelte/store';
import AudioRecorder from '../audio/recorder';
import AudioPlayer from '../audio/player';
import textContent from '../data/text-content';
import type { InputEvent } from '../utils/interfaces';
import { recordedAudioSource } from '../audio/source';
import { setRecorderStatusContent } from './recorder-content';
import { secondsToMinutesString } from '../audio/utils';
import { setCurrentTime, stopAudioPlayback } from './player';

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
  AudioRecorder.deleteRecordedAudioURL();
  AudioPlayer?.deleteRecordedAudioURL();
}

function setRecordedAudioSource(URL: string) {
  recordedAudioSource.setRecordedAudioUrl(URL);
  setupAudioElementListeners(recordedAudioSource._getAudioElement());
  AudioPlayer.setAudioSource(recordedAudioSource.createSource);
}

function setupAudioElementListeners(audioElement: HTMLAudioElement) {
  if (audioElement.onended === null) audioElement.onended = () => stopAudioPlayback();
  if (audioElement.ontimeupdate === null) audioElement.ontimeupdate = () => setCurrentTime(audioElement.currentTime);
  if (audioElement.onloadeddata === null)
    audioElement.onloadeddata = () => setValidAudioDuration(audioElement.duration);
  if (audioElement.ondurationchange === null) audioElement.ondurationchange = audioElement.onloadeddata;
}

function setValidAudioDuration(duration: number) {
  duration = duration !== Infinity ? duration : AudioRecorder.getLastRecordingDuration();
  setRecorderStatusContent(`Recorded audio duration: ${secondsToMinutesString(duration)}`);
  setRecordedAudioDuration(duration);
}
