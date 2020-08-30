import { writable, Writable } from 'svelte/store';
import { ViewState } from '../utils/enums';
import { killAllAudio } from '.';

const defaultAppState = ViewState.RECORDER;

export const viewState: Writable<ViewState> = writable(defaultAppState);

export function closeRecorder() {
  killAllAudio();
  viewState.set(ViewState.HOME)
}
