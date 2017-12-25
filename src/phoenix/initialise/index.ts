import CONFIG from 'config';
import { windowAdd } from 'model/events';
import SyncedFrame from 'model/frames/SyncedFrame';
import WindowNode from 'model/nodes/WindowNode';
import ContainerNode from 'model/nodes/ContainerNode';
import { ScreenModels } from 'model/utils/QueryModel';
import registerAllEvents from './events';
import registerAllInput from './input';
import PhoenixManagedWindow, {
  getPhoenixManagedWindowSyncPromise,
} from '../utils/ManagedWindow';

function buildModel() {
  const screenModels = <ScreenModels>{}

  for (let aScreen of Screen.all()) {
    const containerSyncedFrame = new SyncedFrame(aScreen.flippedVisibleFrame());
    const screenContainerNode = new CONFIG.DEFAULT_CONTAINER(containerSyncedFrame);

    for (let w of aScreen.windows()){
      const managedWindow = new PhoenixManagedWindow(w);
      const syncPromise = getPhoenixManagedWindowSyncPromise(managedWindow);
      if (managedWindow.isValid()) {
        windowAdd(screenContainerNode, managedWindow, syncPromise);
      }
    }

    screenModels[aScreen.hash()] = screenContainerNode;
  };

  return screenModels;
}

export default function initialise() {
  const screenModels = { [Screen.main().hash()]: buildModel()[Screen.main().hash()] };
  const allEvents = registerAllEvents(screenModels);
  const allInput = registerAllInput(screenModels);
}