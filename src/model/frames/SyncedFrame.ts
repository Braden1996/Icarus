import ContainerNode from "../nodes/ContainerNode";

export type setSyncPromise = (rect: Rectangle) => Promise<Rectangle>;

export default class SyncedFrame {
  private toSyncRectangle: Rectangle;

  constructor(
    private syncedRectangle: Rectangle = { x: 0, y: 0, width: 0, height: 0 },
  ) {}

  get(synced = true) {
    return Object.assign({}, this.syncedRectangle);
  }

  async set(newRectangle: Rectangle, setSync: setSyncPromise) {
    this.toSyncRectangle = Object.assign({}, newRectangle);
    this.syncedRectangle = await setSync(this.toSyncRectangle);
  }
}
