import ContainerNode from "../nodes/ContainerNode";

export type setSyncPromise = (rect: Rectangle) => Promise<Rectangle>;

const instantResolve = (rect: Rectangle) =>
  new Promise<Rectangle>(resolve => resolve(rect));

export default class SyncedFrame {
  private toSyncRectangle: Rectangle;

  constructor(
    private syncedRectangle: Rectangle = { x: 0, y: 0, width: 0, height: 0 },
    private readonly setSync: setSyncPromise = instantResolve
  ) {}

  get() {
    return this.getSynced();
  }

  getSynced() {
    return Object.assign({}, this.syncedRectangle);
  }

  getToSync() {
    return Object.assign({}, this.toSyncRectangle);
  }

  async set(newRectangle: Rectangle) {
    this.toSyncRectangle = Object.assign({}, newRectangle);
    this.syncedRectangle = await this.setSync(this.toSyncRectangle);
  }
}
