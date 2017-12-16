import SyncedFrame from 'model/frames/SyncedFrame';
import SyncedFrameNode from 'model/nodes/SyncedFrameNode';

export class TestSyncedFrameNode extends SyncedFrameNode {}

describe('SyncedFrameNode', () => {
  describe('getFrame()', () => {
    it('returns a copy of the frame rect', () => {
      const rootFrameRect = <Rectangle>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TestSyncedFrameNode(rootSyncedFrame);

      expect(rootNode.getFrame()).not.toBe(rootFrameRect);
      expect(rootNode.getFrame()).toEqual(rootFrameRect);
    });
  });

  describe('setFrame()', () => {
    it('allows for async promise', () => {
      const rootFrameRect = <Rectangle>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TestSyncedFrameNode(rootSyncedFrame);

      const nextFrameRect = <Rectangle>{ x: 50, y: 50, width: 150, height: 150 };
      rootNode.setFrame(nextFrameRect).then(() => {
        expect(rootNode.getFrame()).toEqual(nextFrameRect);
      });

      expect(rootNode.getFrame()).not.toEqual(nextFrameRect);
    });
  });

  describe('outerGaps', () => {
    it('should set a padded frame to node\'s SyncedFrame', async () => {
      const rootFrameRect = <Rectangle>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TestSyncedFrameNode(rootSyncedFrame);

      rootNode.outerGaps = 20;
      await rootNode.clean();

      const expectedRect = <Rectangle>{ x: 20, y: 20, width: 60, height: 60 };
      expect(rootSyncedFrame.get()).toEqual(expectedRect);
    });

    it('should not alter the node\'s frame', async () => {
      const rootFrameRect = <Rectangle>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TestSyncedFrameNode(rootSyncedFrame);

      rootNode.outerGaps = 20;
      await rootNode.clean();

      expect(rootNode.getFrame()).toEqual(rootFrameRect);
    });

    it('should preserve outerGaps after frame change', async () => {
      const rootFrameRect = <Rectangle>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TestSyncedFrameNode(rootSyncedFrame);

      rootNode.outerGaps = 20;
      await rootNode.clean();

      const nextFrameRect = <Rectangle>{ x: 50, y: 50, width: 150, height: 150 };
      await rootNode.setFrame(nextFrameRect);

      const expectedRect = <Rectangle>{ x: 70, y: 70, width: 110, height: 110 };
      expect(rootSyncedFrame.get()).toEqual(expectedRect);
    });
  });
});
