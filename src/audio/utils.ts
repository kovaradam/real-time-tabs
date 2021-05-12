export function secondsToMinutesString(inputInSeconds: number) {
  const minutes = Math.floor(inputInSeconds / 60);
  const seconds = inputInSeconds % 60;
  const secondsString = seconds < 10 ? `0${seconds.toFixed()}` : seconds.toFixed();
  return `${minutes}:${secondsString}`;
}
