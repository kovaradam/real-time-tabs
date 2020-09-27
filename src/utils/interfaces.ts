export interface BlobEvent {
  readonly data: Blob;
  readonly timeCode: DOMHighResTimeStamp;
}

export type InputEvent = Event & {
  target: EventTarget & HTMLInputElement;
};
