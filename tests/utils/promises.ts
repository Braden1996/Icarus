import SyncedFrame, { Frame } from 'model/frames/SyncedFrame';

export const delayedResolve = (rect: Frame) =>
  new Promise<Frame>(resolve => setTimeout(() => resolve(rect), 50));
