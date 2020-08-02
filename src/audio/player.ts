const audioContext = new AudioContext();
const oscillator = audioContext.createOscillator();
oscillator.frequency.value = 440;
oscillator.start();

const gainNode = audioContext.createGain();

export const audioStart = () => {
  oscillator.connect(gainNode).connect(audioContext.destination);
};

export const audioStop = () => {
  oscillator.disconnect();
};

export const audioSetVolume = (value: number) => {
    const normalised = value / 50
    gainNode.gain.value = normalised;
}