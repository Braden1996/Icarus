import { PhoenixManagedWindow } from './extension';
import ContainerNode from "../../model/nodes/ContainerNode";
import {
  windowAdd,
  windowRemoveFromParent,
  windowMinimise,
  windowUnminimise
} from '../../model/events';
import { ScreenModels } from '../../model/utils/QueryModel';
import { getFocussedScreen } from './utils';

function registerAllEvents(models: ScreenModels) {
  return {
    minimiseWindow: Event.on('windowDidMinimise', (theWindow) => {
      const managedWindow = new PhoenixManagedWindow(theWindow);
      if (managedWindow.isValid()) windowMinimise(models, managedWindow);
    }),
    unminimiseWindow: Event.on('windowDidUnminimise', (theWindow) => {
      const managedWindow = new PhoenixManagedWindow(theWindow);
      if (managedWindow.isValid()) windowUnminimise(models, managedWindow);
    }),
    closeWindowRemoveFromLayout: Event.on('windowDidClose', (theWindow) => {
      const managedWindow = new PhoenixManagedWindow(theWindow);
      if (managedWindow.isValid()) windowRemoveFromParent(models, managedWindow);
    }),
    openWindowAddToLayout: Event.on('windowDidOpen', (theWindow) => {
      const currentScreen = getFocussedScreen(models);
      if (!currentScreen) return;
      const managedWindow = new PhoenixManagedWindow(theWindow);
      if (managedWindow.isValid()) windowAdd(currentScreen, managedWindow);
    }),
  }
}

export default registerAllEvents;
