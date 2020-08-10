import { AudioContextSingleton } from './context';

class Microphone {
  private static instance: Microphone;

  private constructor(
    private streamSource: MediaStreamAudioSourceNode = undefined,
    private audioContext: AudioContext = undefined,
  ) {}

  static getInstance = () => {
    if (Microphone.instance === undefined) {
      Microphone.instance = new Microphone();
    }
    return Microphone.instance;
  };

  handleMicrophoneConnect = (stream: MediaStream) => {
    if (this.streamSource === undefined) {
      this.audioContext = AudioContextSingleton.getInstance();
      this.streamSource = this.audioContext.createMediaStreamSource(stream);
    }

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
}

export const microphone = Microphone.getInstance();
