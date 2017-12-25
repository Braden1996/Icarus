import CONFIG from 'config';
import ContainerNode from "model/nodes/ContainerNode";
import {
  windowAdd,
  windowRemoveFromParent,
  windowMinimise,
  windowUnminimise
} from 'model/events';
import { ScreenModels } from 'model/utils/QueryModel';
import PhoenixManagedWindow, {
  getPhoenixManagedWindowSyncPromise,
} from '../utils/ManagedWindow';
import { getFocussedScreen } from '../utils/helpers';

function registerAllEvents(models: ScreenModels) {
  return {
    minimiseWindow: Event.on('windowDidMinimise', (theWindow) => {
      CONFIG.DEBUG('windowDidMinimise', theWindow);
      const managedWindow = new PhoenixManagedWindow(theWindow);
      if (managedWindow.isValid()) windowMinimise(models, managedWindow);
    }),
    unminimiseWindow: Event.on('windowDidUnminimise', (theWindow) => {
      CONFIG.DEBUG('windowDidUnminimise', theWindow);
      const managedWindow = new PhoenixManagedWindow(theWindow);
      if (managedWindow.isValid()) windowUnminimise(models, managedWindow);
    }),
    closeWindowRemoveFromLayout: Event.on('windowDidClose', (theWindow) => {
      CONFIG.DEBUG('windowDidClose', theWindow);
      const managedWindow = new PhoenixManagedWindow(theWindow);
      if (managedWindow.isValid()) windowRemoveFromParent(models, managedWindow);
    }),
    openWindowAddToLayout: Event.on('windowDidOpen', (theWindow) => {
      CONFIG.DEBUG('windowDidOpen', theWindow);
      const currentScreen = getFocussedScreen(models);
      if (!currentScreen) return;
      const managedWindow = new PhoenixManagedWindow(theWindow);
      const syncPromise = getPhoenixManagedWindowSyncPromise(managedWindow);
      if (managedWindow.isValid()) {
        windowAdd(currentScreen, managedWindow, syncPromise);
      }
    }),
  }
}

export default registerAllEvents;
