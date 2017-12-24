import SyncedFrame, { Frame } from 'model/frames/SyncedFrame';
import TileNode from 'model/nodes/TileNode';
import { TestSyncedFrameNode } from './SyncedFrameNode.test';

describe('TileNode', () => {
  describe('innerGaps', () => {
    it('should not allow for negative values', () => {
      const rootFrameRect = <Frame>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TileNode(rootSyncedFrame);

      rootNode.innerGaps = -16;

      expect(rootNode.innerGaps).toBe(0);
    });
  });

  describe('ExtraSize', () => {
    it('should default to 0', () => {
      const rootFrameRect = <Frame>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TileNode(rootSyncedFrame);

      const childFrameRect = <Frame>{ x: 0, y: 0, width: 100, height: 100 };
      const childSyncedFrame = new SyncedFrame(childFrameRect);
      const childNode = new TestSyncedFrameNode(childSyncedFrame);
      rootNode.addChild(childNode);

      expect(rootNode.getExtraSize(childNode)).toBe(0);
    });

    it('should allow child node to have its own unique extraSize', () => {
      const rootFrameRect = <Frame>{ x: 0, y: 0, width: 100, height: 100 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      const rootNode = new TileNode(rootSyncedFrame);

      const childFrameRect1 = <Frame>{ x: 0, y: 0, width: 100, height: 100 };
      const childSyncedFrame1 = new SyncedFrame(childFrameRect1);
      const childNode1 = new TestSyncedFrameNode(childSyncedFrame1);
      rootNode.addChild(childNode1);

      const childFrameRect2 = <Frame>{ x: 50, y: 50, width: 150, height: 150 };
      const childSyncedFrame2 = new SyncedFrame(childFrameRect2);
      const childNode2 = new TestSyncedFrameNode(childSyncedFrame2);
      rootNode.addChild(childNode2);

      rootNode.setExtraSize(childNode1, 16);
      rootNode.setExtraSize(childNode2, 8);
      expect(rootNode.getExtraSize(childNode1)).toBe(16);
      expect(rootNode.getExtraSize(childNode2)).toBe(8);
    });
  });

  describe('doLayout', () => {
    let rootNode: TileNode;
    let childNode1: TestSyncedFrameNode;
    let childNode2: TestSyncedFrameNode;
    let childNode3: TestSyncedFrameNode;

    const arbitraryInitialFrame = <Frame>{ x: 0, y: 0, width: 25, height: 75 };

    beforeEach(() => {
      const rootFrameRect = <Frame>{ x: 0, y: 0, width: 75, height: 75 };
      const rootSyncedFrame = new SyncedFrame(rootFrameRect);
      rootNode = new TileNode(rootSyncedFrame);

      const childSyncedFrame1 = new SyncedFrame(arbitraryInitialFrame);
      childNode1 = new TestSyncedFrameNode(childSyncedFrame1);
      rootNode.addChild(childNode1);

      const childSyncedFrame2 = new SyncedFrame(arbitraryInitialFrame);
      childNode2 = new TestSyncedFrameNode(childSyncedFrame2);
      rootNode.addChild(childNode2);

      const childSyncedFrame3 = new SyncedFrame(arbitraryInitialFrame);
      childNode3 = new TestSyncedFrameNode(childSyncedFrame3);
      rootNode.addChild(childNode3);

      rootNode.innerGaps = 0;
      rootNode.horizontalLayout = true;
    });

    it('should only do layout explicity', () => {
      expect(childNode1.getFrame()).toEqual(arbitraryInitialFrame);
      expect(childNode2.getFrame()).toEqual(arbitraryInitialFrame);
      expect(childNode3.getFrame()).toEqual(arbitraryInitialFrame);
    });

    it('should divide and position nodes horizontal', async () => {
      await rootNode.doLayout();

      const expectedChildFrame1 = <Frame>{ x: 0, y: 0, width: 25, height: 75 };
      const expectedChildFrame2 = <Frame>{ x: 25, y: 0, width: 25, height: 75 };
      const expectedChildFrame3 = <Frame>{ x: 50, y: 0, width: 25, height: 75 };

      expect(childNode1.getFrame()).toEqual(expectedChildFrame1);
      expect(childNode2.getFrame()).toEqual(expectedChildFrame2);
      expect(childNode3.getFrame()).toEqual(expectedChildFrame3);
    });

    it('should divide and position nodes vertically', async () => {
      rootNode.horizontalLayout = false;

      await rootNode.doLayout();

      const expectedChildFrame1 = <Frame>{ x: 0, y: 0, width: 75, height: 25 };
      const expectedChildFrame2 = <Frame>{ x: 0, y: 25, width: 75, height: 25 };
      const expectedChildFrame3 = <Frame>{ x: 0, y: 50, width: 75, height: 25 };

      expect(childNode1.getFrame()).toEqual(expectedChildFrame1);
      expect(childNode2.getFrame()).toEqual(expectedChildFrame2);
      expect(childNode3.getFrame()).toEqual(expectedChildFrame3);
    });

    it('should utilise innerGaps', async () => {
      rootNode.innerGaps = 9;

      await rootNode.doLayout();

      const expectedChildFrame1 = <Frame>{ x: 0, y: 0, width: 19, height: 75 };
      const expectedChildFrame2 = <Frame>{ x: 28, y: 0, width: 19, height: 75 };
      const expectedChildFrame3 = <Frame>{ x: 56, y: 0, width: 19, height: 75 };

      expect(childNode1.getFrame()).toEqual(expectedChildFrame1);
      expect(childNode2.getFrame()).toEqual(expectedChildFrame2);
      expect(childNode3.getFrame()).toEqual(expectedChildFrame3);
    });

    it('should utilise extraSize when on the end', async () => {
      rootNode.setExtraSize(childNode1, 15);

      await rootNode.doLayout();

      const expectedChildFrame1 = <Frame>{ x: 0, y: 0, width: 35, height: 75 };
      const expectedChildFrame2 = <Frame>{ x: 35, y: 0, width: 20, height: 75 };
      const expectedChildFrame3 = <Frame>{ x: 55, y: 0, width: 20, height: 75 };

      expect(childNode1.getFrame()).toEqual(expectedChildFrame1);
      expect(childNode2.getFrame()).toEqual(expectedChildFrame2);
      expect(childNode3.getFrame()).toEqual(expectedChildFrame3);
    });

    it('should utilise extraSize when between siblings', async () => {
      rootNode.setExtraSize(childNode2, 15);

      await rootNode.doLayout();

      const expectedChildFrame1 = <Frame>{ x: 0, y: 0, width: 20, height: 75 };
      const expectedChildFrame2 = <Frame>{ x: 20, y: 0, width: 35, height: 75 };
      const expectedChildFrame3 = <Frame>{ x: 55, y: 0, width: 20, height: 75 };

      expect(childNode1.getFrame()).toEqual(expectedChildFrame1);
      expect(childNode2.getFrame()).toEqual(expectedChildFrame2);
      expect(childNode3.getFrame()).toEqual(expectedChildFrame3);
    });

    it('should compensate for remainders', async () => {
      const nonDivisbleInitialFrame = <Frame>{ x: 0, y: 0, width: 80, height: 80 };
      await rootNode.setFrame(nonDivisbleInitialFrame);

      await rootNode.doLayout();

      const expectedChildFrame1 = <Frame>{ x: 0, y: 0, width: 27, height: 80 };
      const expectedChildFrame2 = <Frame>{ x: 27, y: 0, width: 27, height: 80 };
      const expectedChildFrame3 = <Frame>{ x: 54, y: 0, width: 26, height: 80 };

      expect(childNode1.getFrame()).toEqual(expectedChildFrame1);
      expect(childNode2.getFrame()).toEqual(expectedChildFrame2);
      expect(childNode3.getFrame()).toEqual(expectedChildFrame3);
    });

    it('should trigger doLayout for child who are ContainerFrames', async () => {
      const realRootFrameRect = <Frame>{ x: 0, y: 0, width: 75, height: 75 };
      const realRootSyncedFrame = new SyncedFrame(realRootFrameRect);
      const realRootNode = new TileNode(realRootSyncedFrame);
      realRootNode.addChild(rootNode);

      const spy = jest.spyOn(rootNode, 'doLayout');

      await realRootNode.doLayout();

      expect(spy).toHaveBeenCalled();
    });
  });
});
