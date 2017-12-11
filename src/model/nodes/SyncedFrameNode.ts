import CONFIG from '../../config';
import SyncedFrame, { setSyncPromise } from '../frames/SyncedFrame';
import ContainerNode from './ContainerNode'
import TreeNode from './TreeNode';
import TileNode from './TileNode';

const instantResolve = (rect: Rectangle) =>
  new Promise<Rectangle>(resolve => resolve(rect));

export default abstract class SyncedFrameNode extends TreeNode {
  hidden = false;
  protected _outerGaps = 0;

  constructor(private syncedFrame: SyncedFrame) { super(); }

  getFrame(): Rectangle {
    const frame = this.syncedFrame.get();
    return {
      x: frame.x - this.outerGaps,
      y: frame.y - this.outerGaps,
      width: frame.width + (2 * this.outerGaps),
      height: frame.height + (2 * this.outerGaps),
    }
  }

  get outerGaps(): number {
    return this._outerGaps;
  }

  set outerGaps(outerGaps: number) {
    this._outerGaps = Math.max(outerGaps, 0);
  }

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

  async setFrame(frame: Rectangle, setPromise: setSyncPromise = instantResolve) {
    const paddedFrame = {
      x: frame.x + this.outerGaps,
      y: frame.y + this.outerGaps,
      width: frame.width - (2 * this.outerGaps),
      height: frame.height - (2 * this.outerGaps),
    }
    await this.syncedFrame.set(paddedFrame, setPromise);
  }
}
