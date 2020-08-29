import { writable, Writable } from 'svelte/store';
import { ViewState } from '../utils/enums';

const defaultAppState = ViewState.LANDING;

export const viewState: Writable<ViewState> = writable(defaultAppState);
