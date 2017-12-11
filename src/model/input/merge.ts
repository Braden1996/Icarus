import ContainerNode from "../nodes/ContainerNode";
import SyncedFrameNode from "../nodes/SyncedFrameNode";
import TileNode from "../nodes/TileNode";
import DIRECTIONS from '../utils/Directions';
import QueryModel, { QueryableType, ScreenModels } from "../utils/QueryModel";

export function mergeNode(
  models: ScreenModels,
  managedType: QueryableType,
  direction: DIRECTIONS
) {

  const allModels = Object.values(models);
  const theNode = <SyncedFrameNode>(QueryModel(allModels).get(managedType));
  if (theNode === undefined) return;
  if (theNode.parent === null) return;

  const parent = <ContainerNode>theNode.parent;
  const siblings = parent.getChildren();
  if (siblings.length <= 2) return;
  const theNodeIndex = siblings.findIndex(node => node === theNode);

  if (parent instanceof TileNode) {
    let targetSibling;
    if ([DIRECTIONS.LEFT, DIRECTIONS.TOP].includes(direction)) {
      if (theNodeIndex !== 0) {
        targetSibling = siblings[theNodeIndex - 1];
      }
    } else {
      if (theNodeIndex !== (siblings.length - 1)) {
        targetSibling = siblings[theNodeIndex + 1];
      }
    }

    if (targetSibling) {
      theNode.addChild(targetSibling);
      parent.doLayout();
    }
  }
}
