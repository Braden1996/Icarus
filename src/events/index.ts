import ScreenNode from "../nodes/ScreenNode";

import {
  windowAdd,
  windowRemoveFromParent,
  windowParentDoLayout
} from './common';

function registerAllEvents(screenModel: ScreenNode) {
  return {
    minimiseWindowParentDoLayout: Event.on('windowDidMinimise', (theWindow) => {
      windowParentDoLayout(screenModel, theWindow);
    }),
    unminimiseWindowParentDoLayout: Event.on('windowDidUnminimise', (theWindow) => {
      windowParentDoLayout(screenModel, theWindow);
    }),
    closeWindowRemoveFromLayout: Event.on('windowDidClose', (theWindow) => {
      windowRemoveFromParent(screenModel, theWindow);
    }),
    openWindowAddToLayout: Event.on('windowDidOpen', (theWindow) => {
      windowAdd(screenModel, theWindow);
    }),
  }
}

export default registerAllEvents;
