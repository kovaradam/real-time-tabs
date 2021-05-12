import { writable } from 'svelte/store';
import textContent from '../data/text-content';

export const recorderStatusContent = writable(textContent.recorder.default);

export function setRecorderStatusContent(content: string) {
  recorderStatusContent.set(content);
}
