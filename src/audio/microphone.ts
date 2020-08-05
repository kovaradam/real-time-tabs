import { AudioContextSingleton } from "./context";

class Microphone {
  private static instance = null;
  streamSource = null;
  audioContext = null;

  private constructor() {}

  static getInstance = () => {
    if (Microphone.instance === null) {
      Microphone.instance = new Microphone();
    }
    return Microphone.instance;
  };

  handleMicrophoneConnect = (stream: MediaStream) => {
    if (this.streamSource === null) {
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

export default Microphone.getInstance();
