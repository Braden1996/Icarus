import BaseNode from './BaseNode';

export default class ScreenNode extends BaseNode {
  protected outerGaps = 32;

  constructor(private managedScreen: Screen) { super(); }

  isScreen(aScreen: Screen) {
    return this.managedScreen.hash() === aScreen.hash();
  }

  toString() {
    return `Screen ${this.managedScreen.identifier()}`;
  }

  increaseOuterGaps(amount: number) {
    this.outerGaps = Math.max(this.outerGaps + amount, 0);
    this.doLayout();
  }

  increaseInnerGaps(amount: number) {
    this.innerGaps = Math.max(this.innerGaps + amount, 0);
    this.doLayout();
  }

  protected getFrame() {
    return this.applyOuterGaps(this.managedScreen.visibleFrame());
  }

  protected setFrame() {
    throw new Error('Unable to set the frame of a ScreenNode');
  }
}
