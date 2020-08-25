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

export const setIsAudioPlayback = (isStart: boolean) => {
  if (isStart) {
    isStart = audioPlayer.start();
    if(!isStart) setHelpContent(textContent.error.noFileToPlay , true);
  } else {
    audioPlayer.stop();
  }
  isAudioPlayback.set(isStart);
};

export const setIsRecording = (isStart: boolean) => {
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
};

const stopRecording = () => {
  if (!audioRecorder.isRecording()) return;
  audioRecorder.stop();
};

const startRecording = () => {
  if (!audioRecorder.isCollectAudioCallbackSet()) {
    audioRecorder.setCollectAudioCallback(setRecordedAudioURL);
  }
  audioRecorder.start();
};
