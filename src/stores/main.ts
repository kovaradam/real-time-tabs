import { writable, Writable } from 'svelte/store';
import { AppState } from '../utils/enums';

const defaultAppState = AppState.RECORDER;

export const appState: Writable<AppState> = writable(defaultAppState);
