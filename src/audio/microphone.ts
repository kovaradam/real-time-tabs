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

  private setupStreamSource = (stream: MediaStream) => {
    this.audioContext = AudioContextSingleton.getInstance();
    this.streamSource = this.audioContext.createMediaStreamSource(stream);
    this.mediaRecorder = new MediaRecorder(stream);
  };

  connectUserStream = (stream: MediaStream) => {
    if (this.streamSource === undefined) this.setupStreamSource(stream);
    this.streamSource.connect(this.audioContext.destination);
  };

  connect = async () => {
    if (!navigator.mediaDevices) return false;
    return navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(stream => {
        this.connectUserStream(stream);
        return true;
      })
      .catch(() => false);
  };

  disconnect = () => {
    if (this.streamSource) {
      this.streamSource.disconnect();
    }
  };

  getMediaRecorder = () => {
    return this.mediaRecorder;
  };
}

export const microphone = Microphone.getInstance();
