class Microphone {
  private static instance = null;
  streamSource = null;
  audioContext = null;

  private constructor() {}

  static createInstance = () => {
    if (Microphone.instance !== null) return null;
    return new Microphone();
  };

  handleMicrophoneConnect = (stream: MediaStream) => {
    if (this.streamSource === null) {
      this.audioContext = new AudioContext();
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

export default Microphone.createInstance();
