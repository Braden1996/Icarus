import TileNode from 'model/nodes/TileNode';
import WindowNode, { ManagedWindow } from 'model/nodes/WindowNode';
import constructTreeScenario from './treeScenario';

describe('constructTreeScenario()', () => {
  it('should construct tree with two horizontally adjacent window nodes', async () => {
    const parentNode = <TileNode>await constructTreeScenario(`
      <tile>
        <window></window>
        <window></window>
      </tile>
    `);

    expect(parentNode).toBeInstanceOf(TileNode);
    expect(parentNode.parent).toBeNull();
    expect(parentNode.horizontalLayout).toBeTruthy();

    const children = <WindowNode[]>parentNode.getChildren();
    expect(children).toHaveLength(2);
    expect(children[0]).toBeInstanceOf(WindowNode);
    expect(children[1]).toBeInstanceOf(WindowNode);
  });

  it('should construct tree with two vertically adjacent window nodes', async () => {
    const parentNode = <TileNode>await constructTreeScenario(`
      <tile direction="vertical">
        <window></window>
        <window></window>
      </tile>
    `);

    expect(parentNode).toBeInstanceOf(TileNode);
    expect(parentNode.parent).toBeNull();
    expect(parentNode.horizontalLayout).toBeFalsy();

    const children = <WindowNode[]>parentNode.getChildren();
    expect(children).toHaveLength(2);
    expect(children[0]).toBeInstanceOf(WindowNode);
    expect(children[1]).toBeInstanceOf(WindowNode);
  });
});
