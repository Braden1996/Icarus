import ContainerNode from "model/nodes/ContainerNode";
import {
  cycleGapsMode,
  increaseGaps,
  decreaseGaps,
  toggleAxis,
  mergeNode
} from 'model/input';
import { ScreenModels } from 'model/utils/QueryModel';
import DIRECTIONS from 'model/utils/Directions';
import { getFocussedWindow } from '../utils/helpers';

const { LEFT, TOP, BOTTOM, RIGHT } = DIRECTIONS;

const modifier = <Phoenix.ModifierKey[]>[ 'ctrl', 'shift', 'alt' ];

function registerAllInput(models: ScreenModels) {
  return {
    cycleGapsMode: Key.on('g', modifier, () => cycleGapsMode()),
    increaseGaps: Key.on('o', modifier, () => {
      const focussedWindow = getFocussedWindow();
      if (focussedWindow) increaseGaps(models, focussedWindow);
    }),
    decreaseGaps: Key.on('p', modifier, () => {
      const focussedWindow = getFocussedWindow();
      if (focussedWindow) decreaseGaps(models, focussedWindow);
    }),
    toggleAxis: Key.on('a', modifier, () => {
      const focussedWindow = getFocussedWindow();
      if (focussedWindow) toggleAxis(models, focussedWindow);
    }),
    mergeNodeLeft: Key.on('h', modifier, () => {
      const focussedWindow = getFocussedWindow();
      if (focussedWindow) mergeNode(models, focussedWindow, LEFT);
    }),
    mergeNodeBottom: Key.on('j', modifier, () => {
      const focussedWindow = getFocussedWindow();
      if (focussedWindow) mergeNode(models, focussedWindow, BOTTOM);
    }),
    mergeNodeTop: Key.on('k', modifier, () => {
      const focussedWindow = getFocussedWindow();
      if (focussedWindow) mergeNode(models, focussedWindow, TOP);
    }),
    mergeNodeRight: Key.on('l', modifier, () => {
      const focussedWindow = getFocussedWindow();
      if (focussedWindow) mergeNode(models, focussedWindow, RIGHT);
    }),
  }
}

export default registerAllInput;
