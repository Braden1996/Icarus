import ContainerNode from 'model/nodes/ContainerNode';
import SyncedFrameNode from 'model/nodes/SyncedFrameNode';
import WindowNode from 'model/nodes/WindowNode';
import DIRECTIONS, {
  getNodeInDirection,
  findWindows,
  findInDirection,
} from 'model/utils/Directions';
import constructTreeScenario from '../../utils/treeScenario';

const { LEFT, UP, DOWN, RIGHT } = DIRECTIONS;

describe('getNodeInDirection()', () => {
  it('should get sibling node within same horizontal TileNode', async () => {
    const parentNode = await constructTreeScenario(`
      <tile>
        <window></window>
        <window></window>
        <window></window>
      </tile>
    `);

    const window1 = <WindowNode>(parentNode.getChildren()[0]);
    const window2 = <WindowNode>(parentNode.getChildren()[1]);
    const window3 = <WindowNode>(parentNode.getChildren()[2]);

    expect(getNodeInDirection(window3, LEFT)).toBe(window2);
    expect(getNodeInDirection(window1, RIGHT)).toBe(window2);
    expect(getNodeInDirection(window2, LEFT)).toBe(window1);
    expect(getNodeInDirection(window2, RIGHT)).toBe(window3);
  });

  it('should get parents sibling, if no siblings of itself', async () => {
    const parentNode = await constructTreeScenario(`
      <tile>
        <tile>
          <window></window>
          <window></window>
        </tile>
        <tile>
          <window></window>
          <window></window>
        </tile>
      </tile>
    `);

    const innerTile1 = <WindowNode>(parentNode.getChildren()[0]);
    const window1 = <WindowNode>(innerTile1.getChildren()[0]);
    const window2 = <WindowNode>(innerTile1.getChildren()[1]);

    const innerTile2 = <WindowNode>(parentNode.getChildren()[1]);
    const window3 = <WindowNode>(innerTile2.getChildren()[0]);
    const window4 = <WindowNode>(innerTile2.getChildren()[1]);

    expect(getNodeInDirection(window3, LEFT)).toBe(innerTile1);
    expect(getNodeInDirection(window2, RIGHT)).toBe(innerTile2);
  });
});

describe('findInDirection()', () => {
  it('should get an adjacent node in a seperate adjacent container', async () => {
    const parentNode = <ContainerNode> await constructTreeScenario(`
      <tile direction="vertical">
        <tile>
          <window></window>
          <window></window>
        </tile>
        <tile>
          <window></window>
          <window></window>
        </tile>
      </tile>
    `);

    await parentNode.doLayout();

    const innerTile1 = <WindowNode>(parentNode.getChildren()[0]);
    const window1 = <WindowNode>(innerTile1.getChildren()[0]);
    const window2 = <WindowNode>(innerTile1.getChildren()[1]);

    const innerTile2 = <WindowNode>(parentNode.getChildren()[1]);
    const window3 = <WindowNode>(innerTile2.getChildren()[0]);
    const window4 = <WindowNode>(innerTile2.getChildren()[1]);

    expect(findInDirection(window1, DOWN, findWindows)).toBe(window3);
    expect(findInDirection(window3, UP, findWindows)).toBe(window1);
    expect(findInDirection(window2, DOWN, findWindows)).toBe(window4);
    expect(findInDirection(window4, UP, findWindows)).toBe(window2);
  });
});
