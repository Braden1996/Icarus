import BaseNode from './BaseNode';
import GroupNode from './GroupNode';

export default class WindowNode extends BaseNode {
  constructor(private managedWindow: Window) { super(); }

  isWindow(aWindow: Window) {
    return this.managedWindow.hash() === aWindow.hash();
  }

  toString() {
    return `${this.managedWindow.title()}`;
  }

  addChild(child: BaseNode) {
    const newGroupNode = new GroupNode(this.getFrame());
    newGroupNode.addChild(this);
    newGroupNode.addChild(child);
    this.parent!.replaceChild(this, newGroupNode);
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

  // Some windows aren't meant to be tiled.
  static validWindow(managedWindow: Window) {
    return managedWindow.isNormal()
      && (managedWindow.isVisible() || managedWindow.isMinimized());
  }
}
