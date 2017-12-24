import ContainerNode from './nodes/ContainerNode';
import TileNode from './nodes/TileNode';
import SyncedFrame from './frames/SyncedFrame';

export default interface ConfigSchema {
  DEFAULT_CONTAINER: new (syncedFrame: SyncedFrame) => ContainerNode;
}

export const defaultConfig: ConfigSchema = {
  DEFAULT_CONTAINER: TileNode,
}
