import debug from "../debug";
import { getWindowNode } from "../utils/nodeFinders";
import ScreenNode from "../nodes/ScreenNode";

import DIRECTIONS from './direction';

export function swapWindow(screenModel: ScreenNode, direction: DIRECTIONS) {
  const focussedWindow = Window.focused();
  if (focussedWindow === undefined) return;

  const focussedNode = getWindowNode(screenModel, focussedWindow);
  if (focussedNode !== undefined) {
    switch (direction) {
      case DIRECTIONS.LEFT:
        debug('Swapping left');
        break;
      case DIRECTIONS.TOP:
        debug('Swapping top');
        break;
      case DIRECTIONS.BOTTOM:
        debug('Swapping bottom');
        break;
      case DIRECTIONS.RIGHT:
        debug('Swapping right');
        break;
    }
  }
}
