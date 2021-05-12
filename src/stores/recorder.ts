import { writable } from 'svelte/store';
import { getStoreAttribute, toggleStoreAttribute } from './utils';
import Microphone from '../audio/microphone';
import AudioRecorder from '../audio/recorder';
import { setHelpContent } from './help-content';
import textContent from '../data/text-content';
import { recordedAudioName, setRecordedAudioURL } from './audio-files';
import { setRecorderStatusContent } from './recorder-content';

const defaultRecorderSettings = {
  isMetronomeOn: false,
  isMicrophoneOn: false,
  isCountInOn: false,
  isRecording: false,
  bpm: 110,
  timeSignature: { upper: 4, lower: 4 },
};

export const recorderStore = writable(defaultRecorderSettings);

export const setTimeSignatureState = (event: KeyboardEvent, type: 'upper' | 'lower') => {
  if (event.key === 'ArrowUp') {
    recorderStore.update(prevState => {
      prevState.timeSignature[type] += 1;
      return prevState;
    });
  }
  if (event.key === 'ArrowDown') {
    recorderStore.update(prevState => {
      prevState.timeSignature[type] -= prevState.timeSignature[type] > 1 ? 1 : 0;
      return prevState;
    });
  }
};

export const setBPMState = (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    recorderStore.update(prevState => {
      prevState.bpm += 1;
      return prevState;
    });
  }
  if (event.key === 'ArrowDown') {
    recorderStore.update(prevState => {
      prevState.bpm -= prevState.bpm > 1 ? 1 : 0;
      return prevState;
    });
  }
};

export const toggleMetronome = () => {
  toggleStoreAttribute(recorderStore, 'isMetronomeOn');
};

export const toggleCountIn = () => {
  toggleStoreAttribute(recorderStore, 'isCountInOn');
};

export const setIsMicrophoneOn = async (input: boolean) => {
  if (input) {
    input = await Microphone.connect();
  } else {
    Microphone.disconnect();
    setIsRecording(false);
  }
  recorderStore.update(prev => ({ ...prev, isMicrophoneOn: input }));
};

export function setIsRecording(isStart: boolean) {
  function updater(prevState: typeof defaultRecorderSettings): typeof defaultRecorderSettings {
    return { ...prevState, isRecording: isStart };
  }
  if (!isStart) {
    stopRecording();
    recorderStore.update(updater);
    return;
  }
  const isMicrophoneOn = getStoreAttribute<typeof defaultRecorderSettings>(recorderStore, 'isMicrophoneOn');
  if (isMicrophoneOn) {
    startRecording();
    recorderStore.update(updater);
  } else {
    setHelpContent(textContent.error.microphoneOff, true);
  }
}

function stopRecording() {
  if (!AudioRecorder.isRecording()) return;
  recordedAudioName.set(textContent.audioFiles.defaultRecoredAudioName);
  AudioRecorder.stop();
}

function startRecording() {
  if (!AudioRecorder.isCollectAudioCallbackSet()) {
    AudioRecorder.setCollectAudioCallback(setRecordedAudioURL);
  }
  setRecordedAudioURL('');
  setRecorderStatusContent('Recording...');
  AudioRecorder.start();
}
