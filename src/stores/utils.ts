import { recordedAudioSource } from "../audio/source";
import { audioPlayer } from "../audio/player";
import { stopAudioPlayback, setCurrentTime, setRecorderStatusContent } from "./player";
import { secondsToMinutes } from "../audio/utils";
import { setRecordedAudioDuration } from "./audio-files";

export function setRecordedAudioSource(URL: string) {
    recordedAudioSource.setRecordedAudioUrl(URL);
    setupAudioElementListeners(recordedAudioSource._getAudioElement());
    audioPlayer.setAudioSource(recordedAudioSource.createSource);
  }
  
  function setupAudioElementListeners(audioElement: HTMLAudioElement) {
    if (audioElement.onended === null ) audioElement.onended = () => stopAudioPlayback();
    if (audioElement.ontimeupdate === null ) audioElement.ontimeupdate = () => setCurrentTime(audioElement.currentTime);
    if (audioElement.onloadeddata === null ) audioElement.onloadeddata = () => {
      setRecorderStatusContent(`Recorded audio duration: ${secondsToMinutes(audioElement.duration)}`);
      setRecordedAudioDuration(audioElement.duration);
    };
    if (audioElement.ondurationchange === null ) audioElement.ondurationchange = audioElement.onloadeddata;
    if (audioElement.oncanplaythrough === null ) audioElement.oncanplaythrough = audioElement.onloadeddata;
  }