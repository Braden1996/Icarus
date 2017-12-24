import SyncedFrame, { Frame } from '../frames/SyncedFrame';
import TreeNode, { TreeNodeJSON } from './TreeNode';

export interface SyncedFrameNodeJSON extends TreeNodeJSON {
  hidden: boolean;
  outerGaps: number;
  frame: Frame;
}

export default abstract class SyncedFrameNode extends TreeNode {
  hidden = false;
  protected _outerGaps = 0;
  private nextOuterGaps: number | null = null;
  private outerGapsDirty = true;

  constructor(private syncedFrame: SyncedFrame) { super(); }

  toJSON(): SyncedFrameNodeJSON {
    return Object.assign({}, super.toJSON(), {
      hidden: this.hidden,
      outerGaps: this.outerGaps,
      frame: this.syncedFrame.get(),
    });
  }

  getFrame(): Frame {
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

  setFrame(frame: Frame) {
    this.markCleanFrame();

    const paddedFrame = this.applyOuterGaps(frame);
    return this.syncedFrame.set(paddedFrame);
  }

  private applyOuterGaps(frame: Frame) {
    return {
      x: frame.x + this.outerGaps,
      y: frame.y + this.outerGaps,
      width: frame.width - (2 * this.outerGaps),
      height: frame.height - (2 * this.outerGaps),
    };
  }

  private removeOuterGaps(frame: Frame) {
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
