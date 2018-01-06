import ContainerNode from '../nodes/ContainerNode';
import SyncedFrameNode from '../nodes/SyncedFrameNode';
import TileNode from '../nodes/TileNode';
import WindowNode from '../nodes/WindowNode';
import { Frame } from '../frames/SyncedFrame';

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


export function findWindows(child: SyncedFrameNode) {
  return child instanceof WindowNode;
}

type Frame1D = { x: number, width: number };
const collision = (line1: Frame1D, line2: Frame1D) =>
  line1.x < line2.x + line2.width &&
  line1.width + line1.x > line2.x;

export function findInDirection(
  fromChild: SyncedFrameNode,
  direction: DIRECTIONS,
  findFunction: (node: SyncedFrameNode) => boolean
): SyncedFrameNode | undefined {
  const fromFrame1D: Frame1D = HORIZONTAL_DIRECTIONS.includes(direction)
    ? { x: fromChild.getFrame().y, width: fromChild.getFrame().height }
    : { x: fromChild.getFrame().x, width: fromChild.getFrame().width };

  const directionNode = getNodeInDirection(fromChild, direction);
  if (directionNode === undefined) return;
  if (findFunction(directionNode)) return directionNode;

  if (directionNode instanceof ContainerNode) {
    const layoutChildren = directionNode.getChildrenToLayout();
    return <SyncedFrameNode | undefined>directionNode.findChild((child) => {
      const frameChild = <SyncedFrameNode>child;
      if (!layoutChildren.includes(frameChild)) return false;
      const cFrame1D: Frame1D = HORIZONTAL_DIRECTIONS.includes(direction)
        ? { x: frameChild.getFrame().y, width: frameChild.getFrame().height }
        : { x: frameChild.getFrame().x, width: frameChild.getFrame().width };
      return collision(fromFrame1D, cFrame1D) && findFunction(frameChild);
    });
  }
}
