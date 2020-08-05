export class AudioContextSingleton {
  static audioContextInstance: AudioContext = null;

  private constructor() {}

  static getInstance = () => {
    if (AudioContextSingleton.audioContextInstance === null) {
      AudioContextSingleton.audioContextInstance = new AudioContext();
    }
    return AudioContextSingleton.audioContextInstance;
  };
}

