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
    const children = this.getChildrenToLayout();
    const childFrames = this.calculateChildFrames(children);
    children.forEach(async (child, i) => {
      const childFrame = childFrames[i];
      await child.setFrame(childFrame);
      if (child instanceof ContainerNode) child.doLayout();
    });
  }

  private calculateChildFrames(children: SyncedFrameNode[]): Rectangle[] {
    let baseFrame = this.calculateInitialBaseFrame(children);
    const childFrames = children.map(child => {
      const childFrame = this.calculateChildFrame(child, baseFrame);
      baseFrame = this.calculateNextBaseFrame(childFrame, baseFrame);
      return childFrame;
    });
    return childFrames;
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

  private calculateInitialBaseFrame(children: SyncedFrameNode[]): Rectangle {
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

  private calculateNextBaseFrame(lastChildFrame: Rectangle, baseFrame: Rectangle) {
    const { x, y, width, height } = baseFrame;
    return Object.assign({
      width,
      height
    }, this.horizontalLayout
      ? {
        x: x + lastChildFrame.width + this.innerGaps,
        y,
      } : {
        x,
        y: y + lastChildFrame.height + this.innerGaps,
      }
    );
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
}
