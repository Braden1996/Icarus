import SyncedFrameNode from './SyncedFrameNode';

export default abstract class ContainerNode extends SyncedFrameNode {
  abstract doLayout(): void

  removeChild(child: SyncedFrameNode) {
    const children = this.getChildren();
    if (this.parent !== undefined && children.length === 1) {
      this.remove();
    } else {
      super.removeChild(child);
    }
  }

  protected getChildrenToLayout(): SyncedFrameNode[] {
    return this.getChildren()
      .map(child => <SyncedFrameNode>child)
      .filter(child => !child.hidden);
  }
}
