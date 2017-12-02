import BaseNode from './BaseNode';
import GroupNode from './GroupNode';

export default class WindowNode extends BaseNode {
  constructor(public managedWindow: Window) { super(); }

  toString() {
    return `${this.managedWindow.title()}`;
  }

  addChild(child: BaseNode) {
    const newGroupNode = new GroupNode(this.getFrame());
    newGroupNode.addChild(this);
    newGroupNode.addChild(child);
    this.parent.replaceChild(this, newGroupNode);
  }

  protected getFrame() {
    return this.managedWindow.frame();
  }

  protected setFrame(frame: Rectangle) {
    this.managedWindow.setFrame(frame);
  }

  protected inLayout() {
    return !this.managedWindow.isMinimized();
  }
}
