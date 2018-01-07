import CONFIG from 'config';
import { windowAdd } from 'model/events';
import SyncedFrame from 'model/frames/SyncedFrame';
import WindowNode from 'model/nodes/WindowNode';
import ContainerNode from 'model/nodes/ContainerNode';
import QueryModel, { ScreenModels } from 'model/utils/QueryModel';
import registerAllEvents from './events';
import registerAllInput from './input';
import PhoenixManagedWindow, {
  getPhoenixManagedWindowSyncPromise,
} from '../utils/ManagedWindow';

export function syncSpaceModel(screenModels: ScreenModels, aSpace: Space) {
  const screens = aSpace.screens();

  // We do not support spaces which belong to multiple screens.
  if (screens.length > 1) {
    delete screenModels[aSpace.hash()];
    return;
  }

  if (!screenModels[aSpace.hash()]) {
    const frame = screens[0].flippedVisibleFrame();
    const syncedFrame = new SyncedFrame(frame)
    screenModels[aSpace.hash()] = new CONFIG.DEFAULT_CONTAINER(syncedFrame);
  }

  const screenContainerNode = screenModels[aSpace.hash()];
  for (let w of aSpace.windows()) {
    const managedWindow = new PhoenixManagedWindow(w);
    if (QueryModel(screenContainerNode).get(managedWindow)) continue;
    const syncPromise = getPhoenixManagedWindowSyncPromise(managedWindow);
    if (managedWindow.isValid()) {
      windowAdd(screenContainerNode, managedWindow, syncPromise);
    }
  }
}

function buildModel() {
  const screenModels = <ScreenModels>{};
  const activeSpace = Space.active();
  if (activeSpace) syncSpaceModel(screenModels, activeSpace);
  return screenModels;
}

export default function initialise() {
  const screenModels = buildModel();
  const allEvents = registerAllEvents(screenModels);
  const allInput = registerAllInput(screenModels);
}
