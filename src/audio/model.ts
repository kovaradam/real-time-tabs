export interface MediaStream {
  id: string;
  active: boolean;
}

export interface MediaStreamAudioDestinationNode extends AudioNode {
  stream: MediaStream;
}

export interface AudioContext {
  state: string;
  destination: AudioDestinationNode;
  close: () => void;
  createMediaStreamSource: (stream?: MediaStream) => MediaStreamAudioSourceNode;
  createMediaStreamDestination: () => any;
  resume: () => void;
  suspend: () => void;
  decodeAudioData: (arrayBuffer: ArrayBuffer) => AudioBuffer;
  createGain: () => GainNode;
  createOscillator: () => OscillatorNode;
  createMediaElementSource: (element: HTMLAudioElement) => MediaElementAudioSourceNode;
}
