import { microphone } from './microphone';
import type { BlobEvent } from '../utils/interfaces';

export class AudioRecorder {
  private static instance: AudioRecorder = undefined;

  private constructor(
    private mediaRecorder: any = undefined,
    private mediaChunks = [],
    private recordedAudioURL = '',
    private lastRecorderTimeStamp = Date.now(),
    private lastRecordingDuration = 0,
    private collectAudioCallback: (recordedAudioURL: string) => void = undefined,
  ) {}

  static getInstance = () => {
    if (AudioRecorder.instance === undefined) {
      AudioRecorder.instance = new AudioRecorder();
    }
    return AudioRecorder.instance;
  };

  private createMediaRecorder = () => {
    this.mediaRecorder = microphone.getMediaRecorder();
    this.mediaRecorder.ondataavailable = this.captureAudio;
    this.mediaRecorder.onstop = this.collectAudio;
  };

  private captureAudio = (event: BlobEvent) => {
    this.mediaChunks.push(event.data);
  };

  private collectAudio = () => {
    const blob = new Blob(this.mediaChunks, { type: 'audio/ogg; codecs=opus' });
    this.recordedAudioURL = window.URL.createObjectURL(blob);
    this.mediaChunks = [];
    this.collectAudioCallback(this.recordedAudioURL);
  };

  setCollectAudioCallback = (collectAudioCallback: (recordedAudioURL: string) => void) => {
    this.collectAudioCallback = collectAudioCallback;
  };

  isCollectAudioCallbackSet = () => this.collectAudioCallback !== undefined;

  isRecording = () => this.mediaRecorder?.state === 'recording';

  deleteRecordedAudioURL = () => {
    this.recordedAudioURL = '';
  };

  getLastRecordingDuration = () => this.lastRecordingDuration;

  start = () => {
    if (this.mediaRecorder === undefined) this.createMediaRecorder();
    this.mediaRecorder.start();
    this.lastRecorderTimeStamp = Date.now();
    return true;
  };

  stop = () => {
    if (this.isRecording()) {
      this.mediaRecorder.stop();
      this.lastRecordingDuration = (Date.now() - this.lastRecorderTimeStamp) / 1000;
    }
  };
}

export const audioRecorder = AudioRecorder.getInstance();
