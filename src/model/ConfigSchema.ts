import ContainerNode from './nodes/ContainerNode';
import TileNode from './nodes/TileNode';
import SyncedFrame from './frames/SyncedFrame';

export default interface ConfigSchema {
  DEBUG: (...inArgs: any[]) => void
  DEFAULT_CONTAINER: new (syncedFrame: SyncedFrame) => ContainerNode;
}

export const defaultConfig: ConfigSchema = {
  DEBUG: (...inArgs: any[]) => {},
  DEFAULT_CONTAINER: TileNode,
}
