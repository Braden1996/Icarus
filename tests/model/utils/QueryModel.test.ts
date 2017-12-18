import SyncedFrame from 'model/frames/SyncedFrame';
import WindowNode, { ManagedWindow } from 'model/nodes/WindowNode';
import TileNode from 'model/nodes/TileNode';
import QueryModel from 'model/utils/QueryModel';
import { TestManagedWindow } from '../nodes/WindowNode.test';
import { windowAdd } from 'model/events/window';

describe('QueryModel', () => {
  describe('get()', () => {
    it('should return window node associated with queried ManagedWindow', () => {
      const rootFrameRect = <Rectangle>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TileNode(rootSyncedFrame);

      const parentFrameRect = <Rectangle>{ x: 0, y: 0, width: 50, height: 50 };
      const parentSyncedFrame = new SyncedFrame(parentFrameRect);
      const parentNode = new TileNode(parentSyncedFrame);
      rootNode.addChild(parentNode);

      const managedWindow = new TestManagedWindow('NotPong');
      const windowFrameRect = <Rectangle>{ x: 50, y: 50, width: 50, height: 50 };
      const windowSyncedFrame = new SyncedFrame(windowFrameRect);
      const windowNode = new WindowNode(windowSyncedFrame, managedWindow);
      rootNode.addChild(windowNode);

      const managedWindow2 = new TestManagedWindow('Pong');
      const windowFrameRect2 = <Rectangle>{ x: 55, y: 55, width: 40, height: 40 };
      const windowSyncedFrame2 = new SyncedFrame(windowFrameRect2);
      const windowNode2 = new WindowNode(windowSyncedFrame2, managedWindow2);
      parentNode.addChild(windowNode2);

      expect(QueryModel(rootNode).get(managedWindow2)).toBe(windowNode2);
    });
  });

  describe('getRoot()', () => {
    it('should return the root node of the node associated to the queried ManagedWindow', () => {
      const rootFrameRect = <Rectangle>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TileNode(rootSyncedFrame);

      const parentFrameRect = <Rectangle>{ x: 0, y: 0, width: 50, height: 50 };
      const parentSyncedFrame = new SyncedFrame(parentFrameRect);
      const parentNode = new TileNode(parentSyncedFrame);
      rootNode.addChild(parentNode);

      const managedWindow = new TestManagedWindow('Test');
      const windowFrameRect = <Rectangle>{ x: 50, y: 50, width: 50, height: 50 };
      const windowSyncedFrame = new SyncedFrame(windowFrameRect);
      const windowNode = new WindowNode(windowSyncedFrame, managedWindow);
      rootNode.addChild(windowNode);

      const managedWindow2 = new TestManagedWindow('Test2');
      const windowFrameRect2 = <Rectangle>{ x: 55, y: 55, width: 40, height: 40 };
      const windowSyncedFrame2 = new SyncedFrame(windowFrameRect2);
      const windowNode2 = new WindowNode(windowSyncedFrame2, managedWindow2);
      parentNode.addChild(windowNode2);

      expect(QueryModel(rootNode).getRoot(managedWindow2)).toBe(rootNode);
    });

    it('should only return nodes below - and including - the queried node(s)', () => {
      const rootFrameRect = <Rectangle>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TileNode(rootSyncedFrame);

      const parentFrameRect = <Rectangle>{ x: 0, y: 0, width: 50, height: 50 };
      const parentSyncedFrame = new SyncedFrame(parentFrameRect);
      const parentNode = new TileNode(parentSyncedFrame);
      rootNode.addChild(parentNode);

      const managedWindow = new TestManagedWindow('Test');
      const windowFrameRect = <Rectangle>{ x: 50, y: 50, width: 50, height: 50 };
      const windowSyncedFrame = new SyncedFrame(windowFrameRect);
      const windowNode = new WindowNode(windowSyncedFrame, managedWindow);
      rootNode.addChild(windowNode);

      const managedWindow2 = new TestManagedWindow('Test2');
      const windowFrameRect2 = <Rectangle>{ x: 55, y: 55, width: 40, height: 40 };
      const windowSyncedFrame2 = new SyncedFrame(windowFrameRect2);
      const windowNode2 = new WindowNode(windowSyncedFrame2, managedWindow2);
      parentNode.addChild(windowNode2);

      expect(QueryModel(parentNode).getRoot(managedWindow2)).toBe(parentNode);
    });
  });
});
