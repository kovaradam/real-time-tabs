import type { Writable } from 'svelte/store';

export const setStoreAttribute = (store: Writable<{}>, key: string, value: any) => {
  store.update(prevState => {
    prevState[key] = value;
    return prevState;
  });
};

export const toggleStoreAttribute = (store: Writable<{}>, key: string) => {
  store.update(prevState => {
    if (typeof prevState[key] !== 'boolean') throw Error;
    prevState[key] = !prevState[key];
    return prevState;
  });
};
