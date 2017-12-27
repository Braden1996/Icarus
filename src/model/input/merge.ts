import CONFIG from 'config';
import SyncedFrame from '../frames/SyncedFrame';
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

  const directionNode = (<ContainerNode>theNode.parent)
    .getInDirection(theNode, direction);
  if (directionNode === undefined) return;

  const oldParent = <ContainerNode>theNode.parent;
  const oldDirectionNodeParent = <ContainerNode>directionNode.parent;

  // Check if already merged.
  if (oldParent === oldDirectionNodeParent
    && oldParent.getChildren().length === 2) {
    return;
  }

  if (directionNode instanceof ContainerNode) {
    if (directionNode instanceof TileNode
      && ((directionNode.horizontalLayout && direction === DIRECTIONS.RIGHT)
        || (!directionNode.horizontalLayout && direction === DIRECTIONS.BOTTOM)
    )) {
      directionNode.insertChild(theNode, 0);
    } else {
      directionNode.addChild(theNode);
    }
  } else {
    const newContainerNode = new CONFIG.DEFAULT_CONTAINER(new SyncedFrame());

    if (oldParent instanceof TileNode
      &&  newContainerNode instanceof TileNode
    ) {
      newContainerNode.horizontalLayout = oldParent.horizontalLayout;
    }

    if (directionNode.parent) {
      directionNode.parent.replaceChild(directionNode, newContainerNode);
    }

    newContainerNode.addChild(directionNode);
    newContainerNode.addChild(theNode);
  }

  oldParent.doLayout();
  if (!oldDirectionNodeParent.findAncestor(node => node === oldParent)) {
    oldDirectionNodeParent.doLayout();
  }

  CONFIG.DEBUG('mergeNode', { direction, theNode, directionNode });
}
