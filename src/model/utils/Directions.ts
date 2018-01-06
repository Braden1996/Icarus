import ContainerNode from '../nodes/ContainerNode';
import SyncedFrameNode from '../nodes/SyncedFrameNode';
import TileNode from '../nodes/TileNode';

enum DIRECTIONS {
  LEFT,
  UP,
  DOWN,
  RIGHT,
}

export const  HORIZONTAL_DIRECTIONS: DIRECTIONS[] = [
  DIRECTIONS.LEFT,
  DIRECTIONS.RIGHT,
];

export default DIRECTIONS;

export function getNodeInDirection(
  fromChild: SyncedFrameNode,
  direction: DIRECTIONS
): SyncedFrameNode | undefined {
  let container = <ContainerNode>fromChild.parent;

  if (container instanceof TileNode) {
    const horizontal = HORIZONTAL_DIRECTIONS.includes(direction);
    if (container.horizontalLayout === horizontal) {
      const children = container.getChildrenToLayout();
      const theNodeIndex = children.findIndex(node => node === fromChild);
      if (theNodeIndex === -1) return undefined;

      const adjacentOffset =
        [DIRECTIONS.LEFT, DIRECTIONS.UP].includes(direction) ? -1 : 1;
      const index = theNodeIndex + adjacentOffset

      if (index >= 0 && index < children.length) return children[index];
    }

    return container.parent ? getNodeInDirection(container, direction) : undefined;
  }
}
