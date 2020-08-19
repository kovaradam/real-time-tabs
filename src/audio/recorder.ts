import { microphone } from './microphone';

export class AudioRecorder {
  private static instance: AudioRecorder = undefined;

  private constructor(
    private mediaRecorder: any = undefined,
    private mediaChunks = [],
    private recordedAudioURL = '',
    private collectAudioCallback: (recordedAudioURL: string) => void = undefined,
  ) {}

  static getInstance = () => {
    if (AudioRecorder.instance === undefined) {
      AudioRecorder.instance = new AudioRecorder();
    }
    return AudioRecorder.instance;
  };

  private createMediaRecorder = () => {
    this.mediaRecorder = microphone.provideMediaRecorder();
    this.mediaRecorder.ondataavailable = this.captureAudio;
    this.mediaRecorder.onstop = this.collectAudio;
  };

  private captureAudio = e => {
    this.mediaChunks.push(e.data);
  };

  private collectAudio = () => {
    const blob = new Blob(this.mediaChunks, { type: 'audio/ogg; codecs=opus' });
    this.mediaChunks = [];
    this.recordedAudioURL = window.URL.createObjectURL(blob);
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

  start = () => {
    if (this.mediaRecorder === undefined) this.createMediaRecorder();
    this.mediaRecorder.start();
    return true;
  };

  stop = () => {
    if (this.isRecording()) {
      this.mediaRecorder.stop();
    }
  };
}

export const audioRecorder = AudioRecorder.getInstance();
