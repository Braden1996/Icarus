import { ManagedWindow } from "../../model/nodes/WindowNode";

export class PhoenixManagedWindow extends ManagedWindow {
  constructor(public readonly phoenixWindow: Window) {
    super();
  }

  syncPromise(rect: Rectangle) {
    return new Promise<Rectangle>((resolve) => {
      const success = this.phoenixWindow.setFrame(rect);
      resolve(rect)
    });
  }

  isEqual(otherPhoenixManagedWindow: this)  {
    return this.phoenixWindow.isEqual(otherPhoenixManagedWindow.phoenixWindow);
  }

  toString() {
    return this.phoenixWindow.title();
  }

  isValid() {
    return this.phoenixWindow.isNormal()
      && (this.phoenixWindow.isVisible() || this.phoenixWindow.isMinimized());
  }
}
