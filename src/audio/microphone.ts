export {};

let streamSource = null;

const handleMicrophoneConnect = (stream: MediaStream) => {
  const audioContext = new AudioContext();
  streamSource = audioContext.createMediaStreamSource(stream);
  // const processor = audioContext.createScriptProcessor(1024, 1, 1);
  // streamSource.connect(processor);
  // processor.connect(audioContext.destination);
  streamSource.connect(audioContext.destination);
};

export function connectMicrophone() {
  navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(handleMicrophoneConnect);
}

export function disconnectMicrophone() {
  if (streamSource) {
    streamSource.disconnect();
  }
}
