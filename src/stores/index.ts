import { playerSettings, setIsAudioPlayback, setIsRecording } from './player';
import { recorderSettings, setIsMetronomeOn  } from './recorder';
import { helpContent } from './help-content';
import { appState } from './main';
import { setRecordedAudioURL } from './audio-files';

export { appState, recorderSettings, helpContent, playerSettings };

export const killAllAudio = () => {
    setIsAudioPlayback(false);
    setIsRecording(false);
    setIsMetronomeOn(false);
    setRecordedAudioURL('');
  };
  