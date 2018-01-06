import DIRECTIONS from '../utils/Directions';
import SyncedFrameNode from './SyncedFrameNode';

export default abstract class ContainerNode extends SyncedFrameNode {
  abstract doLayout(): void

  removeChild(child: SyncedFrameNode) {
    super.removeChild(child);

    const children = this.getChildren();
    if (this.parent !== null && children.length <= 1) {
      this.remove();
    }
  }

  getChildrenToLayout(): SyncedFrameNode[] {
    return this.getChildren()
      .map(child => <SyncedFrameNode>child)
      .filter(child => !child.hidden);
  }
}
