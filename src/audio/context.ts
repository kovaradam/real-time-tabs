export class AudioContextSingleton {
  static audioContextInstance: AudioContext;

  private constructor() {}

  static getInstance = () => {
    if (AudioContextSingleton.audioContextInstance === undefined) {
      AudioContextSingleton.audioContextInstance = new AudioContext();
    }
    return AudioContextSingleton.audioContextInstance;
  };
}

