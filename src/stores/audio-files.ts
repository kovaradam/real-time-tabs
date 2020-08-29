import { writable } from 'svelte/store';
import { audioRecorder } from '../audio/recorder';
import { audioPlayer } from '../audio/player';
import { recordedAudioSource } from '../audio/source';

export const recordedAudioURL = writable('');
export const recordedAudioDuration = writable(0);

export const setRecordedAudioURL = (URL: string) => {
  recordedAudioURL.set(URL);
  if (URL === '') {
    audioRecorder.deleteRecordedAudioURL();
  } else {
    recordedAudioSource.setRecordedAudioUrl(URL)
    audioPlayer.setAudioSource(recordedAudioSource.createSource)
  }
};

export const setRecordedAudioDuration = (duration: number) => {
  recordedAudioDuration.set(duration);
};
