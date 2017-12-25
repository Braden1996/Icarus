import CONFIG from 'config';
import SyncedFrame, { setSyncPromise } from "../frames/SyncedFrame";
import ContainerNode from "../nodes/ContainerNode";
import WindowNode, { ManagedWindow } from "../nodes/WindowNode";
import QueryModel, { ScreenModels } from "../utils/QueryModel";

export function windowAdd(
  model: ContainerNode,
  theWindow: ManagedWindow,
  setFramePromise?: setSyncPromise,
) {
  const syncedFrame = new SyncedFrame(undefined, setFramePromise);
  const theWindowNode = new WindowNode(syncedFrame, theWindow);
  model.addChild(theWindowNode);
  model.doLayout();
  CONFIG.DEBUG('windowAdd', theWindowNode);
}

export function windowRemoveFromParent(models: ScreenModels, theWindow: ManagedWindow) {
  const allModels = Object.values(models);
  const theWindowNode = <WindowNode>(QueryModel(allModels).get(theWindow));
  if (theWindowNode === undefined) return;

  const parent = theWindowNode.parent;
  theWindowNode.remove();
  (<ContainerNode>parent).doLayout();
  CONFIG.DEBUG('windowRemoveFromParent', theWindowNode);
}

export function windowMinimise(models: ScreenModels, theWindow: ManagedWindow) {
  const allModels = Object.values(models);
  const theWindowNode = <WindowNode>(QueryModel(allModels).get(theWindow));
  if (theWindowNode === undefined) return;

  theWindowNode.hidden = true;
  (<ContainerNode>theWindowNode.parent).doLayout();
  CONFIG.DEBUG('windowMinimise', theWindowNode);
}

export function windowUnminimise(models: ScreenModels, theWindow: ManagedWindow) {
  const allModels = Object.values(models);
  const theWindowNode = <WindowNode>(QueryModel(allModels).get(theWindow));
  if (theWindowNode === undefined) return;

  theWindowNode.hidden = false;
  (<ContainerNode>theWindowNode.parent).doLayout();
  CONFIG.DEBUG('windowUnminimise', theWindowNode);
}
