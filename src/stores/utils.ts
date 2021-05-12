import type { Writable } from 'svelte/store';

export const getStoreAttribute = <T>(store: Writable<T>, key: keyof T) => {
  let value: any;
  store.update(prevState => {
    value = prevState[key];
    return prevState;
  });
  return value;
};

export const toggleStoreAttribute = (store: Writable<{}>, key: string) => {
  store.update(prevState => {
    if (typeof prevState[key] !== 'boolean') throw Error;
    prevState[key] = !prevState[key];
    return prevState;
  });
};
