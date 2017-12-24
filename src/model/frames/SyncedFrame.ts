import ContainerNode from "../nodes/ContainerNode";

export interface Frame {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type setSyncPromise = (rect: Frame) => Promise<Frame>;

const instantResolve = (rect: Frame) =>
  new Promise<Frame>(resolve => resolve(rect));

export default class SyncedFrame {
  private toSyncFrame: Frame;

  constructor(
    private syncedFrame: Frame = { x: 0, y: 0, width: 0, height: 0 },
    private readonly setSync: setSyncPromise = instantResolve
  ) {}

  get() {
    return this.getSynced();
  }

  getSynced() {
    return Object.assign({}, this.syncedFrame);
  }

  getToSync() {
    return Object.assign({}, this.toSyncFrame);
  }

  async set(newFrame: Frame) {
    this.toSyncFrame = Object.assign({}, newFrame);
    this.syncedFrame = await this.setSync(this.toSyncFrame);
  }
}
