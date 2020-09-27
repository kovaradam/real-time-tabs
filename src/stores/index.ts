import { setIsRecording, stopAudioPlayback, setRecorderStatusContent } from './player';
import { setIsMicrophoneOn } from './recorder-settings';
import { setRecordedAudioURL } from './audio-files';
import textContent from '../data/text-content';

export function killAllAudio() {
  stopAudioPlayback();
  setIsRecording(false);
  setIsMicrophoneOn(false);
  setRecordedAudioURL('');
  setRecorderStatusContent(textContent.recorder.noAudio);
}
