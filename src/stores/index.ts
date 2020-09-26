import { setIsRecording, stopAudioPlayback, setRecorderStatusContent } from './player';
import { setIsMicrophoneOn } from './recorder-settings';
import { setRecordedAudioURL } from './audio-files';

export const killAllAudio = () => {
  stopAudioPlayback();
  setIsRecording(false);
  setIsMicrophoneOn(false);
  setRecordedAudioURL('');
  setRecorderStatusContent('Recorder');
};
