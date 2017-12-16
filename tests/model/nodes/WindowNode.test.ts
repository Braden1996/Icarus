import SyncedFrame from 'model/frames/SyncedFrame';
import WindowNode, { ManagedWindow } from 'model/nodes/WindowNode';
import { TestContainerNode } from './ContainerNode.test';
import ContainerNode from 'model/nodes/ContainerNode';

class TestManagedWindow extends ManagedWindow {
  constructor(public readonly id: string) {
    super();
  }

  isEqual(otherManagedWindow: this)  {
    return this.id === otherManagedWindow.id;
  }

  toString() {
    return this.id;
  }

  isValid() {
    return this.id.length % 2 === 0;
  }
}


describe('WindowNode', () => {
  describe('isWindow()', () => {
    it('should return true if ManagedWindow says so', () => {
      const managedWindow = new TestManagedWindow('test');

      const windowFrameRect = <Rectangle>{ x: 0, y: 0, width: 50, height: 50 };
      const windowSyncedFrame = new SyncedFrame(windowFrameRect);
      const windowNode = new WindowNode(windowSyncedFrame, managedWindow);

      expect(windowNode.isWindow(managedWindow)).toBeTruthy();
    });
  });

  describe('isString()', () => {
    it('should return same toString() as ManagedWindow', () => {
      const managedWindow = new TestManagedWindow('test');

      const windowFrameRect = <Rectangle>{ x: 0, y: 0, width: 50, height: 50 };
      const windowSyncedFrame = new SyncedFrame(windowFrameRect);
      const windowNode = new WindowNode(windowSyncedFrame, managedWindow);

      expect(windowNode.toString()).toBe(managedWindow.toString());
    });
  });

  describe('addChild()', () => {
    it('should spawn a container as parent', () => {
      const managedWindow = new TestManagedWindow('window1');
      const windowFrameRect = <Rectangle>{ x: 0, y: 0, width: 50, height: 50 };
      const windowSyncedFrame = new SyncedFrame(windowFrameRect);
      const windowNode = new WindowNode(windowSyncedFrame, managedWindow);

      const managedWindow2 = new TestManagedWindow('window2');
      const windowFrameRect2 = <Rectangle>{ x: 0, y: 0, width: 50, height: 50 };
      const windowSyncedFrame2 = new SyncedFrame(windowFrameRect2);
      const windowNode2 = new WindowNode(windowSyncedFrame2, managedWindow2);

      windowNode.addChild(windowNode2);

      expect(windowNode.parent).toBeInstanceOf(ContainerNode);
    });

    it('should add both window nodes as children to new parent', () => {
      const managedWindow = new TestManagedWindow('window1');
      const windowFrameRect = <Rectangle>{ x: 0, y: 0, width: 50, height: 50 };
      const windowSyncedFrame = new SyncedFrame(windowFrameRect);
      const windowNode = new WindowNode(windowSyncedFrame, managedWindow);

      const managedWindow2 = new TestManagedWindow('window2');
      const windowFrameRect2 = <Rectangle>{ x: 0, y: 0, width: 50, height: 50 };
      const windowSyncedFrame2 = new SyncedFrame(windowFrameRect2);
      const windowNode2 = new WindowNode(windowSyncedFrame2, managedWindow2);

      windowNode.addChild(windowNode2);

      expect(windowNode.parent!.getChildren()).toContain(windowNode);
      expect(windowNode.parent!.getChildren()).toContain(windowNode2);
    });

    it('should position the "child" window after the "parent" window', () => {
      const managedWindow = new TestManagedWindow('window1');
      const windowFrameRect = <Rectangle>{ x: 0, y: 0, width: 50, height: 50 };
      const windowSyncedFrame = new SyncedFrame(windowFrameRect);
      const windowNode = new WindowNode(windowSyncedFrame, managedWindow);

      const managedWindow2 = new TestManagedWindow('window2');
      const windowFrameRect2 = <Rectangle>{ x: 0, y: 0, width: 50, height: 50 };
      const windowSyncedFrame2 = new SyncedFrame(windowFrameRect2);
      const windowNode2 = new WindowNode(windowSyncedFrame2, managedWindow2);

      windowNode.addChild(windowNode2);

      const expectedChildren = [windowNode, windowNode2];
      expect(windowNode.parent!.getChildren()).toEqual(expectedChildren);
    });

    it('should replace self with the new container as child of old parent', () => {
      const containerFrameRect = <Rectangle>{ x: 10, y: 10, width: 80, height: 80 };
      const containerSyncedFrame = new SyncedFrame(containerFrameRect);
      const containerNode = new TestContainerNode(containerSyncedFrame);

      const managedWindow = new TestManagedWindow('window1');
      const windowFrameRect = <Rectangle>{ x: 0, y: 0, width: 50, height: 50 };
      const windowSyncedFrame = new SyncedFrame(windowFrameRect);
      const windowNode = new WindowNode(windowSyncedFrame, managedWindow);

      containerNode.addChild(windowNode);

      const managedWindow2 = new TestManagedWindow('window2');
      const windowFrameRect2 = <Rectangle>{ x: 0, y: 0, width: 50, height: 50 };
      const windowSyncedFrame2 = new SyncedFrame(windowFrameRect2);
      const windowNode2 = new WindowNode(windowSyncedFrame2, managedWindow2);

      windowNode.addChild(windowNode2);

      expect(containerNode.getChildren()).toHaveLength(1);
      expect(containerNode.getChildren()[0]).toBeInstanceOf(ContainerNode);
      expect(containerNode.getChildren()[0]).toBe(windowNode.parent);
      expect(containerNode.getChildren()[0]).toBe(windowNode2.parent);
    });
  });
});
