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
import { syncSpaceModel } from './index';

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
      if (theWindow.spaces().length !== 1) return;
      const theSpace = theWindow.spaces()[0];
      if (!theSpace) return;

      const theSpaceNode = models[theSpace.hash()];

      const managedWindow = new PhoenixManagedWindow(theWindow);
      const syncPromise = getPhoenixManagedWindowSyncPromise(managedWindow);
      if (managedWindow.isValid()) {
        windowAdd(theSpaceNode, managedWindow, syncPromise);
      }
    }),
    spaceChangeInitialiseModel: Event.on('spaceDidChange', () => {
      const theSpace = Space.active();
      if (!theSpace) return;
      CONFIG.DEBUG('spaceDidChange', theSpace.hash());

      syncSpaceModel(models, theSpace);
    }),
  }
}

export default registerAllEvents;
