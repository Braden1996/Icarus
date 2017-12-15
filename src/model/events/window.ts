import SyncedFrame, { setSyncPromise } from "../frames/SyncedFrame";
import ContainerNode from "../nodes/ContainerNode";
import WindowNode, { ManagedWindow } from "../nodes/WindowNode";
import QueryModel, { ScreenModels } from "../utils/QueryModel";

export function windowAdd(
  model: ContainerNode,
  theWindow: ManagedWindow,
  setFramePromise: setSyncPromise,
) {
  const syncedFrame = new SyncedFrame(undefined, setFramePromise);
  model.addChild(new WindowNode(syncedFrame, theWindow));
  model.doLayout();
}

export function windowRemoveFromParent(models: ScreenModels, theWindow: ManagedWindow) {
  const allModels = Object.values(models);
  const theWindowNode = <WindowNode>(QueryModel(allModels).get(theWindow));
  if (theWindowNode === undefined) return;

  const parent = theWindowNode.parent;
  (<ContainerNode>parent).doLayout();
}

export function windowMinimise(models: ScreenModels, theWindow: ManagedWindow) {
  const allModels = Object.values(models);
  const theWindowNode = <WindowNode>(QueryModel(allModels).get(theWindow));
  if (theWindowNode === undefined) return;

  theWindowNode.hidden = true;
  (<ContainerNode>theWindowNode.parent).doLayout();
}

export function windowUnminimise(models: ScreenModels, theWindow: ManagedWindow) {
  const allModels = Object.values(models);
  const theWindowNode = <WindowNode>(QueryModel(allModels).get(theWindow));
  if (theWindowNode === undefined) return;

  theWindowNode.hidden = false;
  (<ContainerNode>theWindowNode.parent).doLayout();
}
