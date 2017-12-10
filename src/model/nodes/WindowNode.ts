import CONFIG from '../../config';
import SyncedFrame from '../frames/SyncedFrame';
import { QueryableType } from '../utils/QueryModel';
import SyncedFrameNode from './SyncedFrameNode';
import TreeNode from './TreeNode';

export abstract class ManagedWindow extends QueryableType {
  abstract syncPromise(rect: Rectangle): Promise<Rectangle>
}

export default class WindowNode extends SyncedFrameNode {
  constructor(
    syncedFrame: SyncedFrame,
    private readonly managedWindow: ManagedWindow,
  ) { super(syncedFrame); }

  isWindow(compareWindow: ManagedWindow): boolean {
    return this.managedWindow.isEqual(compareWindow);
  }

  toString() {
    return this.managedWindow.toString();
  }

  setFrame(frame: Rectangle) {
    const boundFcn = this.managedWindow.syncPromise.bind(this.managedWindow);
    super.setFrame(frame, boundFcn);
  }

  addChild(child: TreeNode) {
    this.promoteToContainer();
    this.parent!.addChild(child);
  }

  private promoteToContainer() {
    const containerSyncedFrame = new SyncedFrame();
    const newContainerNode = new CONFIG.DEFAULT_CONTAINER(containerSyncedFrame);
    newContainerNode.addChild(this);
    this.parent!.replaceChild(this, newContainerNode);
  }
}
