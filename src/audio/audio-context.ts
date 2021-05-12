import type { AudioContext as AudioContextInterface } from './model';

class AudioContextProvider {
  private static _audioContextInstance = new AudioContext();

  static get audioContextInstance(): AudioContextInterface {
    return (AudioContextProvider._audioContextInstance as any) as AudioContextInterface;
  }
}

export default AudioContextProvider;
