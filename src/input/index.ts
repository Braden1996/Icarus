import ScreenNode from "../nodes/ScreenNode";

import DIRECTIONS from './direction';
import { toggleAxis } from './layout';
import { swapWindow } from './nodes';

const { LEFT, TOP, BOTTOM, RIGHT } = DIRECTIONS;

const modifier = <Phoenix.ModifierKey[]>[ 'ctrl', 'shift', 'alt' ];

function registerAllInput(screenModel: ScreenNode) {
  return {
    swapLeft: Key.on('h', modifier, () => swapWindow(screenModel, LEFT)),
    swapTop: Key.on('j', modifier, () => swapWindow(screenModel, TOP)),
    swapBottom: Key.on('k', modifier, () => swapWindow(screenModel, BOTTOM)),
    swapRight: Key.on('l', modifier, () => swapWindow(screenModel, RIGHT)),
    toggleAxis: Key.on('a', modifier, () => toggleAxis(screenModel)),
  }
}

export default registerAllInput;
