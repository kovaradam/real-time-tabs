import { writable } from 'svelte/store';

const defaultHelpContent = '';

export const helpContent = writable(defaultHelpContent);

export const isErrorMessage = writable(false);

export const setHelpContent = (message: string, isError = false) => {
  helpContent.set(message);
  isErrorMessage.set(isError);
}