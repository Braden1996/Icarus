import BaseNode from './BaseNode';

export default class GroupNode extends BaseNode {

  constructor(private frame: Rectangle) { super(); }

  removeChild(child: BaseNode) {
    if (this.children.length === 1) {
      this.parent!.replaceChild(this, this.children[0]);
    } else {
      super.removeChild(child);
    }
  }

  toString() {
    return 'Frame';
  }

  protected getFrame() {
    return this.frame;
  }

  protected setFrame(frame: Rectangle) {
    this.frame = frame;
    this.doLayout();
  }
}
