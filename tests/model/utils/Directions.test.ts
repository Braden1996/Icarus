import WindowNode from 'model/nodes/WindowNode';
import DIRECTIONS, { getNodeInDirection } from 'model/utils/Directions';
import constructTreeScenario from '../../utils/treeScenario';

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

    expect(getNodeInDirection(window3, DIRECTIONS.LEFT)).toBe(window2);
    expect(getNodeInDirection(window1, DIRECTIONS.RIGHT)).toBe(window2);
    expect(getNodeInDirection(window2, DIRECTIONS.LEFT)).toBe(window1);
    expect(getNodeInDirection(window2, DIRECTIONS.RIGHT)).toBe(window3);
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

    expect(getNodeInDirection(window3, DIRECTIONS.LEFT)).toBe(innerTile1);
    expect(getNodeInDirection(window2, DIRECTIONS.RIGHT)).toBe(innerTile2);
  });
});
