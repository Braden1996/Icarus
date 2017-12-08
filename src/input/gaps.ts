import { getWindowNode } from "../utils/nodeFinders";
import ScreenNode from "../nodes/ScreenNode";

enum GapModes {
  None,
  Outer,
  Inner,
}

const GapModesOrder = [GapModes.None, GapModes.Outer, GapModes.Inner];

let currentGapsMode = 0;

export function cycleGapsMode() {
  currentGapsMode = (currentGapsMode + 1) % GapModesOrder.length;
}

export function increaseGaps(screenModel: ScreenNode, amount = 8) {
  if (currentGapsMode === GapModes.None) return;

  const focussedWindow = Window.focused();
  if (focussedWindow === undefined) return;

  const focussedNode = getWindowNode(screenModel, focussedWindow);
  if (focussedNode !== undefined) {
    switch (currentGapsMode) {
      case GapModes.Outer:
        focussedNode.parent!.increaseOuterGaps(amount);
        break;
      case GapModes.Inner:
        focussedNode.parent!.increaseInnerGaps(amount);
        break;
    }
  }
}

export function decreaseGaps(screenModel: ScreenNode, amount = 8) {
  increaseGaps(screenModel, -amount);
}
