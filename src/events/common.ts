import BaseNode from "../nodes/BaseNode";
import ScreenNode from "../nodes/ScreenNode";
import WindowNode from "../nodes/WindowNode";

function getWindowNode(screenModel: ScreenNode, theWindow: Window) {
  return screenModel.find((node: BaseNode) =>
    node instanceof WindowNode && node.managedWindow.hash() === theWindow.hash()
  );
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
