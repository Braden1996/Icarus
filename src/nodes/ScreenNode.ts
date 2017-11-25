import BaseNode from './BaseNode';

export default class ScreenNode extends BaseNode {
  private margin = 32;

  constructor(private managedScreen: Screen) { super(); }

  toString() {
    return `Screen ${this.managedScreen.identifier()}`;
  }

  protected getFrame() {
    const { x, y, width, height } = this.managedScreen.visibleFrame();
    return {
      x: x + this.margin,
      y: y + this.margin,
      width: width - (2 * this.margin),
      height: height - (2 * this.margin),
    };
  }

  protected setFrame() {
    throw new Error('Unable to set the frame of a ScreenNode');
  }
}
