import ContainerNode from "../nodes/ContainerNode";
import SyncedFrameNode from "../nodes/SyncedFrameNode";
import TileNode from "../nodes/TileNode";
import QueryModel, { QueryableType, ScreenModels } from "../utils/QueryModel";

export function toggleAxis(
  models: ScreenModels,
  managedType: QueryableType
) {

  const allModels = Object.values(models);
  const theNode = <SyncedFrameNode>(QueryModel(allModels).get(managedType));
  if (theNode === undefined) return;

  const targetNode = theNode instanceof TileNode
    ? theNode
    : theNode.parent;

  if (!(targetNode instanceof TileNode)) return;

  targetNode.horizontalLayout = !targetNode.horizontalLayout;
  targetNode.doLayout();
}
