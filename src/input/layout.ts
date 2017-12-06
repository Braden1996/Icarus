import { getWindowNode } from "../utils/nodeFinders";
import ScreenNode from "../nodes/ScreenNode";

export function toggleAxis(screenModel: ScreenNode) {
  const focussedWindow = Window.focused();
  if (focussedWindow === undefined) return;

  const focussedNode = getWindowNode(screenModel, focussedWindow);
  if (focussedNode !== undefined) {
    focussedNode.toggleParentLayoutAxis();
  }
}
