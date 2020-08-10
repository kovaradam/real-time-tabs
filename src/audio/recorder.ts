class AudioRecorder {
  private static instance;

  private constructor() {}

  static getInstance = () => {
    if (AudioRecorder.instance === undefined) {
      AudioRecorder.instance = new AudioRecorder();
    }
    return AudioRecorder.instance;
  };

  start = () => {
    return true;
  };

  stop = () => {};
}

export const audioRecorder = AudioRecorder.getInstance();
