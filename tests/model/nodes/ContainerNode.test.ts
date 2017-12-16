import SyncedFrame from 'model/frames/SyncedFrame';
import ContainerNode from 'model/nodes/ContainerNode';
import { TestSyncedFrameNode } from './SyncedFrameNode.test';

export class TestContainerNode extends ContainerNode {
  doLayout() { return; }

  exposedGetChildrenToLayout() {
    return this.getChildrenToLayout();
  }
}

describe('ContainerNode', () => {
  describe('removeChild()', () => {
    it('should destroy itself once its last child is remove', () => {
      const rootFrameRect = <Rectangle>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TestContainerNode(rootSyncedFrame);

      const containerFrameRect = <Rectangle>{ x: 10, y: 10, width: 80, height: 80 };
      const containerSyncedFrame = new SyncedFrame(containerFrameRect);
      const containerNode = new TestContainerNode(containerSyncedFrame);

      const syncedFrameRect = <Rectangle>{ x: 10, y: 10, width: 80, height: 80 };
      const syncedSyncedFrame = new SyncedFrame(syncedFrameRect);
      const syncedNode = new TestSyncedFrameNode(syncedSyncedFrame);

      rootNode.addChild(containerNode);
      containerNode.addChild(syncedNode);

      expect(rootNode.getChildren()).toHaveLength(1);
      expect(containerNode.getChildren()).toHaveLength(1);

      containerNode.removeChild(syncedNode);

      expect(rootNode.getChildren()).toHaveLength(0);
      expect(containerNode.getChildren()).toHaveLength(0);
    });
  });

  describe('getChildrenToLayout()', () => {
    it('should not return hidden children', () => {
      const rootFrameRect = <Rectangle>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TestContainerNode(rootSyncedFrame);

      const syncedFrameRect = <Rectangle>{ x: 0, y: 0, width: 50, height: 50 };
      const syncedSyncedFrame = new SyncedFrame(syncedFrameRect);
      const syncedNode = new TestSyncedFrameNode(syncedSyncedFrame);

      const syncedFrameRect2 = <Rectangle>{ x: 50, y: 50, width: 50, height: 50 };
      const syncedSyncedFrame2 = new SyncedFrame(syncedFrameRect2);
      const syncedNode2 = new TestSyncedFrameNode(syncedSyncedFrame2);

      rootNode.addChild(syncedNode);
      rootNode.addChild(syncedNode2);

      expect(rootNode.exposedGetChildrenToLayout()).toHaveLength(2);

      syncedNode.hidden = true;

      expect(rootNode.exposedGetChildrenToLayout()).toHaveLength(1);
    });
  });
});
