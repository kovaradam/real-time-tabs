class Recorder {
  private static instance = null;

  private constructor() {}

  static getInstance = () => {
    if (Recorder.instance === null) {
      Recorder.instance = new Recorder();
    }
    return Recorder.instance;
  };

  start = () => {};

  stop = () => {};
}

const instance = Recorder.getInstance();

export default instance;
