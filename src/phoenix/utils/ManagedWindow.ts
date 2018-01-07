import { ManagedWindow } from "model/nodes/WindowNode";

export function getPhoenixManagedWindowSyncPromise(
  managedWindow: PhoenixManagedWindow
) {
  return (rect: Rectangle) => new Promise<Rectangle>((resolve) => {
    const success = managedWindow.phoenixWindow.setFrame(rect);
    resolve(rect);
  });
}

export default class PhoenixManagedWindow extends ManagedWindow {
  constructor(public readonly phoenixWindow: Window) {
    super();
  }

  isEqual(otherPhoenixManagedWindow: this)  {
    return this.phoenixWindow.isEqual(otherPhoenixManagedWindow.phoenixWindow);
  }

  toString() {
    return this.phoenixWindow.title();
  }

  isValid() {
    return this.phoenixWindow.spaces().length === 1
      && this.phoenixWindow.isNormal()
      && !this.phoenixWindow.app().isHidden();
  }
}
