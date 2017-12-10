import ContainerNode from "../nodes/ContainerNode";
import TreeNode from "../nodes/TreeNode";
import SyncedFrameNode from "../nodes/SyncedFrameNode";
import WindowNode, { ManagedWindow } from "../nodes/WindowNode";

export type ScreenModels  = { [hash: number]: ContainerNode }

export abstract class QueryableType {
  abstract isEqual(otherQueryableType: this): boolean
  abstract toString(): string
}

class QueryModel {
  private readonly searchRoots: SyncedFrameNode[];

  constructor(searchRoot: SyncedFrameNode | SyncedFrameNode[]) {
    this.searchRoots = Array.isArray(searchRoot) ? searchRoot : [searchRoot];
  }

  get(searchObject: QueryableType): SyncedFrameNode | undefined {
    for (let model of this.searchRoots) {
      const found = this.getAutoType(model, searchObject);
      if (found !== undefined) return found;
    }
  }

  getRoot(searchObject: QueryableType): SyncedFrameNode | undefined {
    const found = this.get(searchObject);
    if (!found) return;
    return <SyncedFrameNode>found.findAncestor((ancestor: TreeNode) =>
      this.searchRoots.includes(<SyncedFrameNode>ancestor)
    );
  }

  private getAutoType(model: SyncedFrameNode, searchObject: QueryableType) {
    if (searchObject instanceof ManagedWindow) {
      return this.getWindowNode(model, <ManagedWindow>searchObject);
    }
    return;
  }

  private getWindowNode(model: SyncedFrameNode, managedWindow: ManagedWindow) {
    return <SyncedFrameNode>model.find((node: TreeNode) =>
      node instanceof WindowNode && node.isWindow(managedWindow)
    );
  }
}

export default function QueryModelFactory(searchRoot: SyncedFrameNode | SyncedFrameNode[]) {
  return new QueryModel(searchRoot);
}
