import { writable } from 'svelte/store';
import { audioPlayer } from '../audio/player';
import { audioRecorder } from '../audio/recorder';
import { recorderSettings } from './recorder';
import { getStoreAttribute } from '../utils/store';
import { setHelpContent } from './help-content';
import textContent from '../data/text-content';
import { setRecordedAudioURL } from './audio-files';

const defaultRecorderPlayerSettings = {
  isSoundOn: true,
  volume: 50,
};

export const isAudioPlayback = writable(false);
export const isRecording = writable(false);
export const playerSettings = writable(defaultRecorderPlayerSettings);
export const recorderStatusContent = writable('Recorder');

export function setRecorderStatusContent(content: string) {
  recorderStatusContent.set(content);
}

export function setIsAudioPlayback(isStart: boolean) {
  if (isStart) {
    isStart = audioPlayer.start();
    if (!isStart) {
      setHelpContent(textContent.error.noFileToPlay, true);
    } else {
      setRecorderStatusContent('Playing...');
    }
  } else {
    setRecorderStatusContent(`Playback paused on ${audioPlayer.getCurrentTime().toFixed(2)}`);
    audioPlayer.pause();
  }
  isAudioPlayback.set(isStart);
}

export function stopAudioPlayback() {
  setRecorderStatusContent('Playback stopped');
  audioPlayer.stop();
  isAudioPlayback.set(false);
}

export function setIsRecording(isStart: boolean) {
  if (!isStart) {
    stopRecording();
    isRecording.set(false);
    return;
  }
  if (getStoreAttribute(recorderSettings, 'isMicrophoneOn')) {
    startRecording();
    setRecordedAudioURL('');
    isRecording.set(true);
  } else {
    setHelpContent(textContent.error.microphoneOff, true);
  }
}

function stopRecording() {
  if (!audioRecorder.isRecording()) return;
  audioRecorder.stop();
}

function startRecording() {
  if (!audioRecorder.isCollectAudioCallbackSet()) {
    audioRecorder.setCollectAudioCallback(setRecordedAudioURL);
  }
  audioRecorder.start();
}
