import SyncedFrame from 'model/frames/SyncedFrame';
import { delayedResolve } from '../../utils/promises';

describe('SyncedFrame', () => {
  describe('get()', () => {
    it('returns a copy of the rect', () => {
      const frameRect = <Rectangle>{ x: 0, y: 0, width: 100, height: 100 };
      const mySyncedFrame = new SyncedFrame(frameRect);

      expect(mySyncedFrame.get()).not.toBe(frameRect);
      expect(mySyncedFrame.get()).toEqual(frameRect);
    });
  });

  describe('getToSync()', () => {
    it('returns a copy of the rect to be synced', () => {
      const frameRect = <Rectangle>{ x: 0, y: 0, width: 100, height: 100 };
      const mySyncedFrame = new SyncedFrame(frameRect);

      const nextFrameRect = <Rectangle>{ x: 50, y: 50, width: 150, height: 150 };
      mySyncedFrame.set(nextFrameRect);

      expect(mySyncedFrame.getToSync()).not.toBe(nextFrameRect);
      expect(mySyncedFrame.getToSync()).toEqual(nextFrameRect);
    });
  });

  describe('set()', () => {
    it('allow passing of async promise', () => {
      const frameRect = <Rectangle>{ x: 0, y: 0, width: 100, height: 100 };
      const mySyncedFrame = new SyncedFrame(frameRect, delayedResolve);

      const nextFrameRect = <Rectangle>{ x: 50, y: 50, width: 150, height: 150 };
      mySyncedFrame.set(nextFrameRect).then(() => {
        expect(mySyncedFrame.get()).toEqual(nextFrameRect);
      });

      expect(mySyncedFrame.get()).toEqual(frameRect);
    });

    it('fallback to instant resolve promise', () => {
      const frameRect = <Rectangle>{ x: 0, y: 0, width: 100, height: 100 };
      const mySyncedFrame = new SyncedFrame(frameRect);

      const nextFrameRect = <Rectangle>{ x: 50, y: 50, width: 150, height: 150 };
      mySyncedFrame.set(nextFrameRect).then(() => {
        expect(mySyncedFrame.get()).toEqual(nextFrameRect);
      });

      expect(mySyncedFrame.get()).toEqual(frameRect);
    });
  });
});
