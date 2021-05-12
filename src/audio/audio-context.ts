import type { AudioContext as AudioContextInterface } from './model';

class AudioContextProvider {
  private static _audioContextInstance: AudioContextInterface = undefined;

  // Use only after user interaction
  static get audioContextInstance(): AudioContextInterface {
    if (!AudioContextProvider._audioContextInstance) {
      AudioContextProvider._audioContextInstance = new AudioContext();
    }
    return (AudioContextProvider._audioContextInstance as any) as AudioContextInterface;
  }
}

export default AudioContextProvider;
