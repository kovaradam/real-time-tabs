import { stopAudioPlayback } from './player';
import { setIsMicrophoneOn, setIsRecording } from './recorder';
import { setRecordedAudioURL } from './audio-files';
import textContent from '../data/text-content';
import { setRecorderStatusContent } from './recorder-content';

export function killAllAudio() {
  stopAudioPlayback();
  setIsRecording(false);
  setIsMicrophoneOn(false);
  setRecordedAudioURL('');
  setRecorderStatusContent(textContent.recorder.noAudio);
}
