import CONFIG from 'config';
import SyncedFrame from '../frames/SyncedFrame';
import ContainerNode from "../nodes/ContainerNode";
import SyncedFrameNode from "../nodes/SyncedFrameNode";
import TileNode from "../nodes/TileNode";
import DIRECTIONS, { findWindows, findInDirection } from '../utils/Directions';
import QueryModel, { QueryableType, ScreenModels } from "../utils/QueryModel";

export function swapNode(
  models: ScreenModels,
  managedType: QueryableType,
  direction: DIRECTIONS
) {
  const allModels = Object.values(models);
  const theNode = <SyncedFrameNode>(QueryModel(allModels).get(managedType));
  if (theNode === undefined) return;

  const directionNode = findInDirection(theNode, direction, findWindows);
  if (directionNode === undefined) return;

  const parent = <ContainerNode>theNode.parent;
  const oldParent = <ContainerNode>directionNode.parent;

  parent.swapChild(theNode, directionNode);

  parent.doLayout();
  if (!oldParent.findAncestor(node => node === parent)) {
    oldParent.doLayout();
  }

  CONFIG.DEBUG('swapNode', { direction, theNode, directionNode });
}
