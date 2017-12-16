import SyncedFrame from '../frames/SyncedFrame';
import { QueryableType } from '../utils/QueryModel';
import SyncedFrameNode from './SyncedFrameNode';
import TreeNode from './TreeNode';

export abstract class ManagedWindow extends QueryableType {}

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

  addChild(child: TreeNode) {
    const newParent = this.createParentContainer();
    newParent.addChild(child);
  }
}
