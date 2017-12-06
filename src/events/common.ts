import { getScreenNode, getWindowNode } from "../utils/nodeFinders";
import ScreenNode from "../nodes/ScreenNode";
import WindowNode from "../nodes/WindowNode";

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
