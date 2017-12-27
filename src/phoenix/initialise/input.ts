import ContainerNode from "model/nodes/ContainerNode";
import {
  cycleGapsMode,
  increaseGaps,
  decreaseGaps,
  toggleAxis,
  swapNode,
  mergeNode,
} from 'model/input';
import { ScreenModels } from 'model/utils/QueryModel';
import DIRECTIONS from 'model/utils/Directions';
import { getFocussedWindow } from '../utils/helpers';

const { LEFT, TOP, BOTTOM, RIGHT } = DIRECTIONS;

const modifier = <Phoenix.ModifierKey[]>[ 'ctrl', 'shift', 'alt' ];

enum NODE_MOVE_MODES {
  SWAP,
  MERGE,
}

let nodeMoveMode = NODE_MOVE_MODES.SWAP;

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
    nodeActionSwapMode: Key.on('s', modifier, () => {
      nodeMoveMode = NODE_MOVE_MODES.SWAP;
    }),
    nodeActionMergeMode: Key.on('m', modifier, () => {
      nodeMoveMode = NODE_MOVE_MODES.MERGE;
    }),
    nodeLeft: Key.on('h', modifier, () => {
      const focussedWindow = getFocussedWindow();
      if (focussedWindow) {
        if (nodeMoveMode === NODE_MOVE_MODES.SWAP){
          swapNode(models, focussedWindow, LEFT);
        } else if (nodeMoveMode === NODE_MOVE_MODES.MERGE){
          mergeNode(models, focussedWindow, LEFT);
        }
      }
    }),
    nodeBottom: Key.on('j', modifier, () => {
      const focussedWindow = getFocussedWindow();
      if (focussedWindow) {
        if (nodeMoveMode === NODE_MOVE_MODES.SWAP){
          swapNode(models, focussedWindow, BOTTOM);
        } else if (nodeMoveMode === NODE_MOVE_MODES.MERGE){
          mergeNode(models, focussedWindow, BOTTOM);
        }
      }
    }),
    nodeTop: Key.on('k', modifier, () => {
      const focussedWindow = getFocussedWindow();
      if (focussedWindow) {
        if (nodeMoveMode === NODE_MOVE_MODES.SWAP){
          swapNode(models, focussedWindow, TOP);
        } else if (nodeMoveMode === NODE_MOVE_MODES.MERGE){
          mergeNode(models, focussedWindow, TOP);
        }
      }
    }),
    nodeRight: Key.on('l', modifier, () => {
      const focussedWindow = getFocussedWindow();
      if (focussedWindow) {
        if (nodeMoveMode === NODE_MOVE_MODES.SWAP){
          swapNode(models, focussedWindow, RIGHT);
        } else if (nodeMoveMode === NODE_MOVE_MODES.MERGE){
          mergeNode(models, focussedWindow, RIGHT);
        }
      }
    }),
  }
}

export default registerAllInput;
