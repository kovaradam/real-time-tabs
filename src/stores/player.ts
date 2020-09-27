import { writable } from 'svelte/store';
import { audioPlayer } from '../audio/player';
import { audioRecorder } from '../audio/recorder';
import { recorderSettings } from './recorder-settings';
import { getStoreAttribute } from '../utils/store';
import { setHelpContent } from './help-content';
import textContent from '../data/text-content';
import { recordedAudioName, setRecordedAudioURL } from './audio-files';

const defaultRecorderPlayerSettings = {
  isSoundOn: true,
  volume: 50,
};

export const isAudioPlayback = writable(false);
export const isRecording = writable(false);
export const playerSettings = writable(defaultRecorderPlayerSettings);
export const recorderStatusContent = writable(textContent.recorder.default);
export const currentTime = writable(0);

export function setRecorderStatusContent(content: string) {
  recorderStatusContent.set(content);
}

export function setCurrentTime(time: number) {
  currentTime.set(time);
}

export function setAudioCurrentTime(time: number) {
  audioPlayer.setCurrentTime(time);
}

export function setIsAudioPlayback(isStart: boolean) {
  if (isStart) {
    isStart = audioPlayer.start();
    if (!isStart) {
      setHelpContent(textContent.error.noFileToPlay, true);
    }
  } else {
    audioPlayer.pause();
  }
  isAudioPlayback.set(isStart);
}

export function stopAudioPlayback() {
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
    isRecording.set(true);
  } else {
    setHelpContent(textContent.error.microphoneOff, true);
  }
}

function stopRecording() {
  if (!audioRecorder.isRecording()) return;
  recordedAudioName.set(textContent.audioFiles.defaultRecoredAudioName);
  audioRecorder.stop();
}

function startRecording() {
  if (!audioRecorder.isCollectAudioCallbackSet()) {
    audioRecorder.setCollectAudioCallback(setRecordedAudioURL);
  }
  setRecordedAudioURL('');
  setRecorderStatusContent('Recording...');
  audioRecorder.start();
}
