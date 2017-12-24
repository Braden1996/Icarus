import CONFIG from '../../config';
import SyncedFrame from '../frames/SyncedFrame';
import { QueryableType } from '../utils/QueryModel';
import ContainerNode from './ContainerNode';
import SyncedFrameNode, { SyncedFrameNodeJSON } from './SyncedFrameNode';
import TreeNode from './TreeNode';

export interface WindowNodeJSON extends SyncedFrameNodeJSON {
  managedWindow: string;
}

export abstract class ManagedWindow extends QueryableType {}

export default class WindowNode extends SyncedFrameNode {
  constructor(
    syncedFrame: SyncedFrame,
    private readonly managedWindow: ManagedWindow,
  ) { super(syncedFrame); }

  toJSON(): WindowNodeJSON {
    return Object.assign({
      managedWindow: this.managedWindow.toString(),
    }, super.toJSON());
  }

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

  private createParentContainer(
    container: new (syncedFrame: SyncedFrame) => ContainerNode
      = CONFIG.DEFAULT_CONTAINER
  ): ContainerNode {
    const containerSyncedFrame = new SyncedFrame();
    const newContainerNode = new container(containerSyncedFrame);

    if (this.parent) this.parent.replaceChild(this, newContainerNode);

    newContainerNode.addChild(this);
    return newContainerNode;
  }
}
