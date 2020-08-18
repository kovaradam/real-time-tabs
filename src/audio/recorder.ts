import { microphone } from './microphone';

export class AudioRecorder {
  private static instance = undefined;

  private constructor(private mediaRecorder: any = undefined, private mediaChunks = []) {}

  static getInstance = () => {
    if (AudioRecorder.instance === undefined) {
      AudioRecorder.instance = new AudioRecorder();
    }
    return AudioRecorder.instance;
  };

  // private createProcessor = () => {
  //   const bufferSize = 1024;
  //   const numberOfInputChannels = 1;
  //   const numberOfOutputChannels = 1;
  //   this.processor = AudioContextSingleton.getInstance().createScriptProcessor(
  //     bufferSize,
  //     numberOfInputChannels,
  //     numberOfOutputChannels,
  //   );
  // };

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
    const audio = document.createElement('audio');
    const audioURL = window.URL.createObjectURL(blob);
    audio.src = audioURL;
    console.log(audioURL);
    
  };

  start = () => {
    if (this.mediaRecorder === undefined) this.createMediaRecorder();
    this.mediaChunks = [];
    this.mediaRecorder.start();
    return true;
  };

  stop = () => {
    if (this.mediaRecorder?.state === 'recording') {
      this.mediaRecorder.stop();
    }
  };
}

export const audioRecorder = AudioRecorder.getInstance();
