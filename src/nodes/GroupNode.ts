import BaseNode from './BaseNode';

export default class GroupNode extends BaseNode {

  constructor(private frame: Rectangle) { super(); }

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
