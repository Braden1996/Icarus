import ContainerNode from './ContainerNode';
import SyncedFrameNode from './SyncedFrameNode';

export default class TileNode extends ContainerNode {
  horizontalLayout: boolean = true;
  protected _innerGaps = 16;
  private extraSize: number[] = [];

  toString() {
    return 'TileNode';
  }

  get innerGaps(): number {
    return this._innerGaps;
  }

  set innerGaps(innerGaps: number) {
    this._innerGaps = Math.max(innerGaps, 0);
  }

  getExtraSize(child: SyncedFrameNode): number {
    const childIndex = this.findChildIndex(aChild => aChild === child);
    return this.extraSize[childIndex] || 0;
  }

  setExtraSize(child: SyncedFrameNode, extraSize: number) {
    const childIndex = this.findChildIndex(aChild => aChild === child);
    this.extraSize[childIndex] = extraSize;
  }

  doLayout() {
    const baseFrame = this.calculateInitialBaseFrame();
    for (let child of this.getChildrenToLayout()) {
      const childFrame = this.calculateChildFrame(child, baseFrame);
      child.setFrame(childFrame);
      this.updateBaseFrame(childFrame, baseFrame);
    }
  }

  private calculateTotalUsableSize(children: SyncedFrameNode[]) {
    const totalInnerGaps = this.innerGaps * (children.length - 1);
    const totalChildExtraSize = children
      .reduce((total, child) => total + this.getExtraSize(child), 0);
    const { width, height } = this.getFrame();
    return this.horizontalLayout
      ? {
        width: width - totalChildExtraSize - totalInnerGaps,
        height
      } : {
        width,
        height: height - totalChildExtraSize - totalInnerGaps,
      }
  }

  private calculateInitialBaseFrame(): Rectangle {
    const children = this.getChildrenToLayout();
    const { x, y } = this.getFrame();
    const { width, height } = this.calculateTotalUsableSize(children);
    return Object.assign({
      x: Math.floor(x),
      y: Math.floor(y),
    }, this.horizontalLayout
      ? {
        width: Math.ceil(width / children.length),
        height: Math.ceil(height)
      } : {
        width: Math.ceil(width),
        height: Math.ceil(height / children.length)
      }
    );
  }

  private calculateChildFrame(
    child: SyncedFrameNode,
    baseFrame: Rectangle,
  ): Rectangle {
    const frame = Object.assign({}, baseFrame);
    if (this.horizontalLayout) {
      frame.width += this.getExtraSize(child);
    } else {
      frame.height += this.getExtraSize(child);
    }
    return frame;
  }

  private updateBaseFrame(lastChildFrame: Rectangle, baseFrame: Rectangle) {
    if (this.horizontalLayout) {
      baseFrame.x += lastChildFrame.width + this.innerGaps;
    } else {
      baseFrame.y += lastChildFrame.height + this.innerGaps;
    }
  }
}
