import { writable } from 'svelte/store';

const defaultHelpContent = '';

export const helpContent = writable(defaultHelpContent);