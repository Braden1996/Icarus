import { parseString } from 'xml2js';
import TreeNode from 'model/nodes/TreeNode';
import TileNode from 'model/nodes/TileNode';
import WindowNode from 'model/nodes/WindowNode';
import SyncedFrame from 'model/frames/SyncedFrame';
import { TestManagedWindow } from '../model/nodes/WindowNode.test';

const toLowerCase = (name: string) => name.toLowerCase();
const parseOptions = {
  tagNameProcessors: [toLowerCase],
  attrNameProcessors: [toLowerCase],
  valueProcessors: [toLowerCase],
  attrValueProcessors: [toLowerCase],
  explicitChildren: true,
  preserveChildrenOrder: true,
};

function createArbitrarySyncedFrame() {
  return new SyncedFrame({ x: 0, y: 0, width: 1920, height: 1080 });
}

let windowIdCounter = 0;

type nodeArguments = { [attribute: string]: string };
function createNode(nodeType: string, nodeArguments: nodeArguments): TreeNode {
  const syncedFrame = createArbitrarySyncedFrame();
  switch (nodeType) {
    case 'tile':
      const node = new TileNode(syncedFrame);
      if (nodeArguments.direction) {
        node.horizontalLayout = nodeArguments.direction !== 'vertical';
      }
      return node;
    case 'window':
      const managedWindow = new TestManagedWindow(
        nodeArguments.id || `window #${(windowIdCounter++).toString()}`
      );
      return new WindowNode(syncedFrame, managedWindow);
    default:
      throw new Error(`Invalid node type in tree scenario '${nodeType}'.`);
  }
}

type xmlObject = {
  '#name': string,
  '$': nodeArguments | undefined,
  '$$': [xmlObject] | undefined,
}
function treeToModel(tree: xmlObject): TreeNode {
  const node = createNode(tree['#name'], tree['$'] || {});
  if (Array.isArray(tree['$$'])) {
    tree['$$']!.forEach(child => node.addChild(treeToModel(child)));
  }
  return node;
}

type treeScenario = { [nodeType: string]: xmlObject };
export default async function constructTreeScenario(
  treeScenarioXML: string
): Promise<TreeNode> {
  const tree = <treeScenario> await new Promise(resolve => {
    parseString(
      treeScenarioXML,
      parseOptions,
      (err, result) => resolve(result)
    );
  });

  return treeToModel(tree[Object.keys(tree)[0]]);
}
