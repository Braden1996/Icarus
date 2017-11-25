import GroupNode from './GroupNode';
import WindowNode from './WindowNode';

enum LayoutAxis {
  Horizontal,
  Vertical,
}

export default abstract class BaseNode {
  protected parent: BaseNode;
  protected children: BaseNode[] = [];
  private layout: LayoutAxis = LayoutAxis.Horizontal;
  private spacing = 16;
  private extraSize = 0;

  addChild(node: BaseNode) {
    node.parent = this;
    this.children.push(node);
    this.doLayout();
  }

  replaceChild(oldChild: BaseNode, newChild: BaseNode) {
    this.children.map(child => child === oldChild ? newChild : oldChild);
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

  abstract toString(): string

  protected abstract getFrame(): Rectangle
  protected abstract setFrame(rectangle: Rectangle): void

  protected inLayout() {
    return true;
  }

  protected getChildrenInLayout() {
    return this.children.filter(child => child.inLayout());
  }

  protected doLayout() {
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
        x += width + child.extraSize + this.spacing;
      } else {
        y += height + child.extraSize + this.spacing;
      }
    }
  }

  private getChildBaseSize(size: number) {
    const children = this.getChildrenInLayout();
    const totalSpacing = this.spacing * (children.length - 1);
    const totalChildExtraSize = children.reduce((a, c) => a + c.extraSize, 0);
    return Math.floor(
      (size - totalChildExtraSize - totalSpacing) / children.length
    );
  }
}
