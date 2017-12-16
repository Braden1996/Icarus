import CONFIG from '../../config';
import SyncedFrame, { setSyncPromise } from '../frames/SyncedFrame';
import ContainerNode from './ContainerNode'
import TreeNode from './TreeNode';
import TileNode from './TileNode';

export default abstract class SyncedFrameNode extends TreeNode {
  hidden = false;
  protected _outerGaps = 0;
  private nextOuterGaps: number | null = null;
  private outerGapsDirty = true;

  constructor(private syncedFrame: SyncedFrame) { super(); }

  getFrame(): Rectangle {
    const frame = this.syncedFrame.get();
    return this.removeOuterGaps(frame);
  }

  get outerGaps(): number {
    return this._outerGaps;
  }

  set outerGaps(outerGaps: number) {
    const newOuterGaps = Math.max(outerGaps, 0);
    if (newOuterGaps === this.outerGaps) return;

    this.outerGapsDirty = true;
    this.nextOuterGaps = newOuterGaps
  }

  isFrameDirty() {
    return this.outerGapsDirty;
  }

  clean() {
    return this.setFrame(this.getFrame());
  }

  // TODO: factor this function out of the node class.
  createParentContainer(
    container: new (syncedFrame: SyncedFrame) => ContainerNode
      = CONFIG.DEFAULT_CONTAINER
  ): ContainerNode {
    const containerSyncedFrame = new SyncedFrame();
    const newContainerNode = new container(containerSyncedFrame);
    this.parent!.replaceChild(this, newContainerNode);
    newContainerNode.addChild(this);
    return newContainerNode;
  }

  setFrame(frame: Rectangle) {
    this.markCleanFrame();

    const paddedFrame = this.applyOuterGaps(frame);
    return this.syncedFrame.set(paddedFrame);
  }

  private applyOuterGaps(frame: Rectangle) {
    return {
      x: frame.x + this.outerGaps,
      y: frame.y + this.outerGaps,
      width: frame.width - (2 * this.outerGaps),
      height: frame.height - (2 * this.outerGaps),
    };
  }

  private removeOuterGaps(frame: Rectangle) {
    return {
      x: frame.x - this.outerGaps,
      y: frame.y - this.outerGaps,
      width: frame.width + (2 * this.outerGaps),
      height: frame.height + (2 * this.outerGaps),
    };
  }

  private markCleanFrame() {
    if (!this.isFrameDirty()) return;

    this.outerGapsDirty = false;
    this._outerGaps = this.nextOuterGaps!;
    this.nextOuterGaps = null;
  }
}
