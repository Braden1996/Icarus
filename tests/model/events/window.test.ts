import SyncedFrame, { Frame } from 'model/frames/SyncedFrame';
import WindowNode, { ManagedWindow } from 'model/nodes/WindowNode';
import TileNode from 'model/nodes/TileNode';
import { TestManagedWindow } from '../nodes/WindowNode.test';
import {
  windowAdd,
  windowRemoveFromParent,
  windowMinimise,
  windowUnminimise
} from 'model/events/window';
import QueryModel, { ScreenModels } from 'model/utils/QueryModel';

describe('Window events', () => {
  describe('windowAdd()', () => {
    it('should create new WindowNode for the given ManagedWindow', () => {
      const rootFrameRect = <Frame>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TileNode(rootSyncedFrame);

      const managedWindow = new TestManagedWindow('Pong');
      windowAdd(rootNode, managedWindow);

      const children = rootNode.getChildren();
      expect(children).toHaveLength(1);
      expect(QueryModel(rootNode).get(managedWindow)).toBeDefined();
      expect(QueryModel(rootNode).get(managedWindow)).toBe(children[0]);
    });
  });

  describe('windowRemoveFromParent()', () => {
    it('should remove a WindowNode given its ManagedWindow', () => {
      const rootFrameRect = <Frame>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TileNode(rootSyncedFrame);

      const managedWindow = new TestManagedWindow('Pong');
      windowAdd(rootNode, managedWindow);

      const models = <ScreenModels>{
        '1': rootNode,
      };

      windowRemoveFromParent(models, managedWindow);
      const children = rootNode.getChildren();
      expect(children).toHaveLength(0);
    });
  });

  describe('windowMinimise()', () => {
    it('should hide a window a WindowNode given its ManagedWindow', () => {
      const rootFrameRect = <Frame>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TileNode(rootSyncedFrame);

      const managedWindow = new TestManagedWindow('Pong');
      windowAdd(rootNode, managedWindow);

      const models = <ScreenModels>{
        '1': rootNode,
      };

      windowMinimise(models, managedWindow);
      expect(QueryModel(rootNode).get(managedWindow)!.hidden).toBeTruthy();
    });
  });

  describe('windowUninimise()', () => {
    it('should unhide a window a WindowNode given its ManagedWindow', () => {
      const rootFrameRect = <Frame>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TileNode(rootSyncedFrame);

      const managedWindow = new TestManagedWindow('Pong');
      windowAdd(rootNode, managedWindow);

      const models = <ScreenModels>{
        '1': rootNode,
      };

      windowMinimise(models, managedWindow);
      expect(QueryModel(rootNode).get(managedWindow)!.hidden).toBeTruthy();

      windowUnminimise(models, managedWindow);
      expect(QueryModel(rootNode).get(managedWindow)!.hidden).toBeFalsy();
    });
  });
});
