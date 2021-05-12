import Microphone from './microphone';
import type { BlobEvent } from '../utils/interfaces';

export class AudioRecorder {
  private static mediaRecorder: any = undefined;
  private static mediaChunks = [];
  private static recordedAudioURL = '';
  private static lastRecorderTimeStamp = Date.now();
  private static lastRecordingDuration = 0;
  private static collectAudioCallback: (recordedAudioURL: string) => void = undefined;

  private static createMediaRecorder = () => {
    AudioRecorder.mediaRecorder = Microphone.getMediaRecorder();
    AudioRecorder.mediaRecorder.ondataavailable = AudioRecorder.captureAudio;
    AudioRecorder.mediaRecorder.onstop = AudioRecorder.collectAudio;
  };

  private static captureAudio = (event: BlobEvent) => {
    AudioRecorder.mediaChunks.push(event.data);
  };

  private static collectAudio = () => {
    const blob = new Blob(AudioRecorder.mediaChunks, { type: 'audio/ogg; codecs=opus' });
    AudioRecorder.recordedAudioURL = window.URL.createObjectURL(blob);
    AudioRecorder.mediaChunks = [];
    AudioRecorder.collectAudioCallback(AudioRecorder.recordedAudioURL);
  };

  static setCollectAudioCallback = (collectAudioCallback: (recordedAudioURL: string) => void) => {
    AudioRecorder.collectAudioCallback = collectAudioCallback;
  };

  static isCollectAudioCallbackSet = () => {
    return AudioRecorder.collectAudioCallback !== undefined;
  };

  static isRecording = () => {
    return AudioRecorder.mediaRecorder?.state === 'recording';
  };

  static isAvailable = () => {
    return AudioRecorder.mediaRecorder?.state === 'inactive';
  };

  static deleteRecordedAudioURL = () => {
    AudioRecorder.recordedAudioURL = '';
  };

  static getLastRecordingDuration = () => {
    return AudioRecorder.lastRecordingDuration;
  };

  static start = () => {
    if (AudioRecorder.mediaRecorder === undefined) AudioRecorder.createMediaRecorder();
    AudioRecorder.mediaRecorder.start();
    AudioRecorder.lastRecorderTimeStamp = Date.now();
    return true;
  };

  static stop = () => {
    if (AudioRecorder.isRecording()) {
      AudioRecorder.mediaRecorder.stop();
      AudioRecorder.lastRecordingDuration = (Date.now() - AudioRecorder.lastRecorderTimeStamp) / 1000;
    }
  };
}

export default AudioRecorder;
