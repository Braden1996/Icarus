import SyncedFrame, { Frame } from 'model/frames/SyncedFrame';
import SyncedFrameNode from 'model/nodes/SyncedFrameNode';

export class TestSyncedFrameNode extends SyncedFrameNode {}

describe('SyncedFrameNode', () => {
  describe('toJSON()', () => {
    it('should return object including hidden property', () => {
      const rootFrameRect = <Frame>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TestSyncedFrameNode(rootSyncedFrame);

      rootNode.hidden = true;

      expect(rootNode.toJSON().hidden).toBeTruthy();
    });

    it('should return object including outerGaps property', async () => {
      const rootFrameRect = <Frame>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TestSyncedFrameNode(rootSyncedFrame);

      rootNode.outerGaps = 10;
      await rootNode.clean();

      expect(rootNode.toJSON().outerGaps).toBe(10);
    });

    it('should return object including frame property', () => {
      const rootFrameRect = <Frame>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TestSyncedFrameNode(rootSyncedFrame);

      expect(rootNode.toJSON().frame).toEqual(rootFrameRect);
    });
  });

  describe('getFrame()', () => {
    it('returns a copy of the frame rect', () => {
      const rootFrameRect = <Frame>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TestSyncedFrameNode(rootSyncedFrame);

      expect(rootNode.getFrame()).not.toBe(rootFrameRect);
      expect(rootNode.getFrame()).toEqual(rootFrameRect);
    });
  });

  describe('setFrame()', () => {
    it('allows for async promise', () => {
      const rootFrameRect = <Frame>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TestSyncedFrameNode(rootSyncedFrame);

      const nextFrameRect = <Frame>{ x: 50, y: 50, width: 150, height: 150 };
      rootNode.setFrame(nextFrameRect).then(() => {
        expect(rootNode.getFrame()).toEqual(nextFrameRect);
      });

      expect(rootNode.getFrame()).not.toEqual(nextFrameRect);
    });
  });

  describe('outerGaps', () => {
    it('should mark dirty if value is different', async () => {
      const rootFrameRect = <Frame>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TestSyncedFrameNode(rootSyncedFrame);

      rootNode.outerGaps = 20;

      expect(rootNode.isFrameDirty()).toBeTruthy();
    });

    it('should not mark dirty if value is the same', async () => {
      const rootFrameRect = <Frame>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TestSyncedFrameNode(rootSyncedFrame);

      rootNode.outerGaps = 20;
      rootNode.clean();
      rootNode.outerGaps = 20;

      expect(rootNode.isFrameDirty()).toBeFalsy();
    });

    it('should set a padded frame to node\'s SyncedFrame', async () => {
      const rootFrameRect = <Frame>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TestSyncedFrameNode(rootSyncedFrame);

      rootNode.outerGaps = 20;
      await rootNode.clean();

      const expectedRect = <Frame>{ x: 20, y: 20, width: 60, height: 60 };
      expect(rootSyncedFrame.get()).toEqual(expectedRect);
    });

    it('should not alter the node\'s frame', async () => {
      const rootFrameRect = <Frame>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TestSyncedFrameNode(rootSyncedFrame);

      rootNode.outerGaps = 20;
      await rootNode.clean();

      expect(rootNode.getFrame()).toEqual(rootFrameRect);
    });

    it('should preserve outerGaps after frame change', async () => {
      const rootFrameRect = <Frame>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TestSyncedFrameNode(rootSyncedFrame);

      rootNode.outerGaps = 20;
      await rootNode.clean();

      const nextFrameRect = <Frame>{ x: 50, y: 50, width: 150, height: 150 };
      await rootNode.setFrame(nextFrameRect);

      const expectedRect = <Frame>{ x: 70, y: 70, width: 110, height: 110 };
      expect(rootSyncedFrame.get()).toEqual(expectedRect);
    });
  });
});
