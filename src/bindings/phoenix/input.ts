import ContainerNode from "../../model/nodes/ContainerNode";
import {
  cycleGapsMode,
  increaseGaps,
  decreaseGaps,
  toggleAxis
} from '../../model/input';
import { ScreenModels } from '../../model/utils/QueryModel';
import { getFocussedWindow } from './utils';

const modifier = <Phoenix.ModifierKey[]>[ 'ctrl', 'shift', 'alt' ];

function registerAllInput(models: ScreenModels) {
  return {
    toggleAxis: Key.on('a', modifier, () => {
      const focussedWindow = getFocussedWindow();
      if (focussedWindow) toggleAxis(models, focussedWindow);
    }),
    cycleGapsMode: Key.on('g', modifier, () => cycleGapsMode()),
    increaseGaps: Key.on('o', modifier, () => {
      const focussedWindow = getFocussedWindow();
      if (focussedWindow) increaseGaps(models, focussedWindow);
    }),
    decreaseGaps: Key.on('p', modifier, () => {
      const focussedWindow = getFocussedWindow();
      if (focussedWindow) decreaseGaps(models, focussedWindow);
    }),
  }
}

export default registerAllInput;
