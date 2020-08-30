export function secondsToMinutesString(input: number) {
  const minutes = Math.floor(input / 60);
  const seconds = input % 60;
  const secondsString = seconds < 10 ? `0${seconds.toFixed()}` : seconds.toFixed();
  return `${minutes}:${secondsString}`;
}
