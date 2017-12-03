import BaseNode from "../nodes/BaseNode";
import ScreenNode from "../nodes/ScreenNode";
import WindowNode from "../nodes/WindowNode";

function getWindowNode(screenModel: ScreenNode, theWindow: Window) {
  return screenModel.find((node: BaseNode) =>
    node instanceof WindowNode && node.managedWindow.hash() === theWindow.hash()
  );
}

function getScreenNode(screenModel: ScreenNode, theScreen: Screen) {
  return screenModel.find((node: BaseNode) =>
    node instanceof ScreenNode && node.isScreen(theScreen)
  );
}

export function windowAdd(screenModel: ScreenNode, theWindow: Window) {
  const theScreenNode = getScreenNode(screenModel, theWindow.screen()!);
  if (theScreenNode !== undefined && WindowNode.validWindow(theWindow)) {
    theScreenNode.addChild(new WindowNode(theWindow));
  }
}

export function windowRemoveFromParent(screenModel: ScreenNode, theWindow: Window) {
  const theWindowNode = getWindowNode(screenModel, theWindow);
  if (theWindowNode !== undefined) {
    theWindowNode.remove();
  }
}

export function windowParentDoLayout(screenModel: ScreenNode, theWindow: Window) {
  const theWindowNode = getWindowNode(screenModel, theWindow);
  if (theWindowNode !== undefined) theWindowNode.doParentLayout();
}
