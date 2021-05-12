import AudioContext from './audio-context';

declare var MediaRecorder: any;

class Microphone {
  private static streamSource: MediaStreamAudioSourceNode = undefined;
  private static mediaRecorder: any = undefined;

  private static setupStreamSource = (stream: MediaStream) => {
    Microphone.streamSource = AudioContext.audioContextInstance.createMediaStreamSource(stream);
    Microphone.mediaRecorder = new MediaRecorder(stream);
  };

  static connectUserStream = (stream: MediaStream) => {
    if (Microphone.streamSource === undefined) Microphone.setupStreamSource(stream);
    Microphone.streamSource.connect(AudioContext.audioContextInstance.destination);
  };

  static connect = async () => {
    if (!navigator.mediaDevices) return false;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    try {
      Microphone.connectUserStream(stream);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  static disconnect = () => {
    if (Microphone.streamSource) {
      Microphone.streamSource.disconnect();
    }
  };

  static getMediaRecorder = () => {
    return Microphone.mediaRecorder;
  };
}

export default Microphone;
