import ContainerNode from "../nodes/ContainerNode";
import SyncedFrameNode from "../nodes/SyncedFrameNode";
import TileNode from "../nodes/TileNode";
import QueryModel, { QueryableType, ScreenModels } from "../utils/QueryModel";

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

export function increaseGaps(
  models: ScreenModels,
  managedType: QueryableType,
  amount = 8
) {
  if (currentGapsMode === GapModes.None) return;

  const allModels = Object.values(models);
  const theNode = <SyncedFrameNode>(QueryModel(allModels).get(managedType));
  if (theNode === undefined) return;

  switch (currentGapsMode) {
    case GapModes.Outer:
      theNode.outerGaps += amount;
      const parent = <ContainerNode>theNode.parent;
      parent.doLayout();
      break;
    case GapModes.Inner:
      if (theNode instanceof TileNode) {
        theNode.innerGaps += amount;
        theNode.doLayout();
      } else if (theNode.parent instanceof TileNode) {
        theNode.parent.innerGaps += amount;
        theNode.parent.doLayout();
      }
      break;
  }
}

export function decreaseGaps(
  models: ScreenModels,
  managedType: QueryableType,
  amount = 8
) { increaseGaps(models, managedType, -amount); }
