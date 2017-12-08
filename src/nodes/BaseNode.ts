import GroupNode from './GroupNode';
import WindowNode from './WindowNode';

enum LayoutAxis {
  Horizontal,
  Vertical,
}

export default abstract class BaseNode {
  parent: BaseNode | null;
  protected children: BaseNode[] = [];
  protected layout: LayoutAxis = LayoutAxis.Horizontal;
  protected outerGaps = 0;
  protected innerGaps = 16;
  protected extraSize = 0;

  remove() {
    this.parent!.removeChild(this);
  }

  addChild(node: BaseNode) {
    node.parent = this;
    this.children.push(node);
    this.doLayout();
  }

  replaceChild(oldChild: BaseNode, newChild: BaseNode) {
    oldChild.parent = null;
    newChild.parent = this;
    this.children.map(child => child === oldChild ? newChild : oldChild);
    this.doLayout();
  }

  removeChild(child: BaseNode) {
    child.parent = null;
    this.children = this.children.filter(c => c !== child);
    this.doLayout();
  }

  // Used primarily for debugging.
  toJSON(): any {
    return {
      title: this.toString(),
      children: this.children.length > 0
        ? this.children.map(child => child.toJSON())
        : undefined,
    };
  }

  increaseOuterGaps(amount: number) {
    this.outerGaps = Math.max(this.outerGaps + amount, 0);
    this.parent!.doLayout();
  }

  increaseInnerGaps(amount: number) {
    this.innerGaps = Math.max(this.innerGaps + amount, 0);
    this.parent!.doLayout();
  }

  doLayout() {
    let { x, y, width, height } = this.getFrame();

    if (this.layout === LayoutAxis.Horizontal) {
      width = this.getChildBaseSize(width);
    } else {
      height = this.getChildBaseSize(height);
    }

    for (let child of this.getChildrenInLayout()) {
      if (!child.inLayout()) continue;

      child.setFrame({
        x,
        y,
        width: width + child.extraSize,
        height: height + child.extraSize,
      });

      if (this.layout === LayoutAxis.Horizontal) {
        x += width + child.extraSize + this.innerGaps;
      } else {
        y += height + child.extraSize + this.innerGaps;
      }
    }
  }

  doParentLayout() {
    this.parent!.doLayout();
  }

  toggleParentLayoutAxis() {
    switch (this.parent!.layout) {
      case LayoutAxis.Horizontal:
        this.parent!.layout = LayoutAxis.Vertical;
        break;
      case LayoutAxis.Vertical:
        this.parent!.layout = LayoutAxis.Horizontal;
        break;
    }
    this.doParentLayout();
  }

  find(comparisonFunction: (child: BaseNode) => boolean): BaseNode | undefined {
    if (comparisonFunction(this)) return this;
    for (let child of this.children) {
      const found = child.find(comparisonFunction);
      if (found) return found;
    }
    return undefined;
  }

  abstract toString(): string

  protected abstract getFrame(): Rectangle
  protected abstract setFrame(rectangle: Rectangle): void
  protected applyOuterGaps(frame: Rectangle) {
    return {
      x: frame.x + this.outerGaps,
      y: frame.y + this.outerGaps,
      width: frame.width - (2 * this.outerGaps),
      height: frame.height - (2 * this.outerGaps),
    };
  }

  protected inLayout() {
    return true;
  }

  protected getChildrenInLayout() {
    return this.children.filter(child => child.inLayout());
  }

  private getChildBaseSize(size: number) {
    const children = this.getChildrenInLayout();
    const totalinnerGaps = this.innerGaps * (children.length - 1);
    const totalChildExtraSize = children.reduce((a, c) => a + c.extraSize, 0);
    return Math.floor(
      (size - totalChildExtraSize - totalinnerGaps) / children.length
    );
  }
}
