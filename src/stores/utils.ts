import { recordedAudioSource } from '../audio/source';
import { audioPlayer } from '../audio/player';
import { stopAudioPlayback, setCurrentTime, setRecorderStatusContent } from './player';
import { secondsToMinutesString } from '../audio/utils';
import { setRecordedAudioDuration } from './audio-files';
import { audioRecorder } from '../audio/recorder';

export function setRecordedAudioSource(URL: string) {
  recordedAudioSource.setRecordedAudioUrl(URL);
  setupAudioElementListeners(recordedAudioSource._getAudioElement());
  audioPlayer.setAudioSource(recordedAudioSource.createSource);
}

function setupAudioElementListeners(audioElement: HTMLAudioElement) {
  if (audioElement.onended === null) audioElement.onended = () => stopAudioPlayback();
  if (audioElement.ontimeupdate === null) audioElement.ontimeupdate = () => setCurrentTime(audioElement.currentTime);
  if (audioElement.onloadeddata === null) audioElement.onloadeddata = () => setValidAudioDuration(audioElement.duration);
  if (audioElement.ondurationchange === null) audioElement.ondurationchange = audioElement.onloadeddata;
}

function setValidAudioDuration(duration: number) {
  duration = (duration !== Infinity) ? duration : audioRecorder.getLastRecordingDuration();
  setRecorderStatusContent(`Recorded audio duration: ${secondsToMinutesString(duration)}`);
  setRecordedAudioDuration(duration);
}
