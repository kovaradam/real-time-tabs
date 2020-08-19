import { playerSettings, setIsAudioPlayback, setIsRecording } from './player';
import { setIsMetronomeOn } from './recorder';
import { setRecordedAudioURL } from './audio-files';

export const killAllAudio = () => {
  setIsAudioPlayback(false);
  setIsRecording(false);
  setIsMetronomeOn(false);
  setRecordedAudioURL('');
};
