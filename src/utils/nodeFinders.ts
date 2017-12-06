import BaseNode from "../nodes/BaseNode";
import ScreenNode from "../nodes/ScreenNode";
import WindowNode from "../nodes/WindowNode";

export function getScreenNode(screenModel: ScreenNode, theScreen: Screen) {
  return screenModel.find((node: BaseNode) =>
    node instanceof ScreenNode && node.isScreen(theScreen)
  );
}

export function getWindowNode(screenModel: ScreenNode, theWindow: Window) {
  return screenModel.find((node: BaseNode) =>
    node instanceof WindowNode && node.isWindow(theWindow)
  );
}

