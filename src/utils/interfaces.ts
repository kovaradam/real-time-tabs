export interface BlobEvent {
  readonly data: Blob;
  readonly timeCode: DOMHighResTimeStamp;  
}