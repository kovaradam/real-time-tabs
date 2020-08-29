import { setIsAudioPlayback, setIsRecording, stopAudioPlayback } from './player';
import { setIsMetronomeOn } from './recorder';
import { setRecordedAudioURL } from './audio-files';

export const killAllAudio = () => {
  stopAudioPlayback();
  setIsRecording(false);
  setIsMetronomeOn(false);
  setRecordedAudioURL('');
};
