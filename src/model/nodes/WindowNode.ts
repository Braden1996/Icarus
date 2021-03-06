import CONFIG from 'config';
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
    return Object.assign({}, super.toJSON(), {
      managedWindow: this.managedWindow.toString(),
    });
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

  private createParentContainer(): ContainerNode {
    const newContainerNode = new CONFIG.DEFAULT_CONTAINER(new SyncedFrame());

    if (this.parent) this.parent.replaceChild(this, newContainerNode);

    newContainerNode.addChild(this);
    return newContainerNode;
  }
}
