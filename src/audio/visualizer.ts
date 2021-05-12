import AudioContext from './audio-context';

export const config = { samples: 300, channel: 0, maxAmplitude: 100, minAmplitude: 0 };

async function visualizeAudio(url: string) {
  if (url === '') return '';
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await AudioContext.audioContextInstance.decodeAudioData(arrayBuffer);
  return visualizeAsSVGpoints(audioBuffer);
}

export default visualizeAudio;

function visualizeAsSVGpoints(audioBuffer: AudioBuffer) {
  const filteredData = filterData(audioBuffer);
  const normalizedData = normalizeData(filteredData);
  let SVGpoints = '';
  for (let i = 0; i < normalizedData.length; i++) {
    const [x, y] = [i, normalizedData[i] * config.maxAmplitude];
    SVGpoints = SVGpoints.concat(`${x.toFixed()},${y.toFixed()} `);
  }
  return padSVGpoints(SVGpoints);
}

function filterData(audioBuffer: AudioBuffer) {
  const { samples, channel } = config;
  const rawData = audioBuffer.getChannelData(channel);
  const blockSize = Math.floor(rawData.length / samples);
  const filteredData: number[] = [];
  for (let i = 0; i < samples; i++) {
    let blockStart = blockSize * i;
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum = sum + Math.abs(rawData[blockStart + j]);
    }
    filteredData.push(sum / blockSize);
  }
  return filteredData;
}

function normalizeData(filteredData: number[]) {
  const multiplier = Math.pow(Math.max(...filteredData), -1);
  return filteredData.map(n => n * multiplier);
}

function padSVGpoints(SVGpoints: string) {
  const leftPad = `0,${config.maxAmplitude} `;
  const rightPad = `${config.samples + 1},${config.minAmplitude} ${config.samples},${config.maxAmplitude}`;
  return `${leftPad} ${SVGpoints} ${rightPad}`;
}
