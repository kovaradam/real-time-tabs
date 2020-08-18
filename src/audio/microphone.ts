import { AudioContextSingleton } from './context';

declare var MediaRecorder: any;

class Microphone {
  private static instance: Microphone;

  private constructor(
    private streamSource: MediaStreamAudioSourceNode = undefined,
    private audioContext: AudioContext = undefined,
    private mediaRecorder: any = undefined,
  ) {}

  static getInstance = () => {
    if (Microphone.instance === undefined) {
      Microphone.instance = new Microphone();
    }
    return Microphone.instance;
  };

  private setup = (stream: MediaStream) => {
    this.audioContext = AudioContextSingleton.getInstance();
    this.streamSource = this.audioContext.createMediaStreamSource(stream);
    this.mediaRecorder = new MediaRecorder(stream);
  };

  handleMicrophoneConnect = (stream: MediaStream) => {
    if (this.streamSource === undefined) this.setup(stream);
    this.streamSource.connect(this.audioContext.destination);
  };

  connect = () => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(this.handleMicrophoneConnect);
  };

  disconnect = () => {
    if (this.streamSource) {
      this.streamSource.disconnect();
    }
  };

  provideMediaRecorder = () => {
    return this.mediaRecorder;
  };

  // connectRecorder = (processor: ScriptProcessorNode) => {
  //   this.streamSource.disconnect();
  //   this.streamSource.connect(processor);
  //   processor.connect(this.audioContext.destination);
  //   // processor.onaudioprocess = function (e) {
  //   //   // Do something with the data, e.g. convert it to WAV
  //   //   console.log(e.inputBuffer);
  //   // };
  // };

  // disconnectRecorder = () => {
  //   this.streamSource.disconnect();
  //   this.streamSource.connect(this.audioContext.destination);
  // };
}

export const microphone = Microphone.getInstance();
