import CONFIG from '../../config';
import SyncedFrame from '../frames/SyncedFrame';
import ContainerNode from './ContainerNode';
import SyncedFrameNode from './SyncedFrameNode';


export function createParentContainer(
  node: SyncedFrameNode,
  container: new (syncedFrame: SyncedFrame) => ContainerNode
    = CONFIG.DEFAULT_CONTAINER
): ContainerNode {
  const containerSyncedFrame = new SyncedFrame();
  const newContainerNode = new container(containerSyncedFrame);
  node.parent!.replaceChild(node, newContainerNode);
  newContainerNode.addChild(node);
  return newContainerNode;
}
