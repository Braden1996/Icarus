import ScreenNode from "../nodes/ScreenNode";

import { windowParentDoLayout } from './common';

function registerAllEvents(screenModel: ScreenNode) {
  return {
    minimiseWindowParentDoLayout: Event.on('windowDidMinimise', (theWindow) => {
      windowParentDoLayout(screenModel, theWindow);
    }),
    unminimiseWindowParentDoLayout: Event.on('windowDidUnminimise', (theWindow) => {
      windowParentDoLayout(screenModel, theWindow);
    }),
  }
}

export default registerAllEvents;
