import TreeNode from 'model/nodes/TreeNode';

class TestTreeNode extends TreeNode {}

describe('TreeNode', () => {
  describe('toString()', () => {
    it('should return name of class', () => {
      const rootNode = new TestTreeNode();
      expect(rootNode.toString()).toBe('TestTreeNode');
    });
  });

  describe('toJSON()', () => {
    it('should return object including string', () => {
      const rootNode = new TestTreeNode();
      const debugObject = rootNode.toJSON();
      expect(debugObject.string).toBe('TestTreeNode');
    });

    it('should return object including array of children', () => {
      const rootNode = new TestTreeNode();
      const childNode = new TestTreeNode();
      const childNode2 = new TestTreeNode();
      const childNode3 = new TestTreeNode();

      rootNode.addChild(childNode);
      rootNode.addChild(childNode2);
      childNode2.addChild(childNode3);

      const debugObject = rootNode.toJSON();
      expect(debugObject.children).toHaveLength(2);
      expect(debugObject.children![0].children).toBeUndefined();
      expect(debugObject.children![1].children).toHaveLength(1);
      expect(debugObject.children![1].children![0].children).toBeUndefined();
    });
  });

  describe('isEqual()', () => {
    it('recognises itself', () => {
      const rootNode = new TestTreeNode();
      const childNode = new TestTreeNode();

      expect(rootNode.isEqual(rootNode)).toBeTruthy();
    });

    it('recognises itself from its parent', () => {
      const rootNode = new TestTreeNode();
      const childNode = new TestTreeNode();

      rootNode.addChild(childNode);

      expect(rootNode.getChildren()[0].isEqual(childNode)).toBeTruthy();
    });
  });

  describe('remove()', () => {
    it('remove a node from its parent', () => {
      const rootNode = new TestTreeNode();
      const childNode = new TestTreeNode();

      rootNode.addChild(childNode);

      childNode.remove();

      expect(rootNode.getChildren()).toHaveLength(0);
      expect(childNode.parent).toBeNull();
    });
  });

  describe('getChildren()', () => {
    it('returns an empty array when the node has no children', () => {
      const rootNode = new TestTreeNode();
      const childNode = new TestTreeNode();

      expect(rootNode.getChildren()).toHaveLength(0);
    });

    it('returns an array of children - in the order they were added', () => {
      const rootNode = new TestTreeNode();
      const childNode = new TestTreeNode();
      const childNode2 = new TestTreeNode();
      const childNode3 = new TestTreeNode();

      rootNode.addChild(childNode);
      rootNode.addChild(childNode2);
      rootNode.addChild(childNode3);

      expect(rootNode.getChildren()).toEqual([childNode, childNode2, childNode3]);
    });
  });

  describe('addChild()', () => {
    it('add a node to be the child of another', () => {
      const rootNode = new TestTreeNode();
      const childNode = new TestTreeNode();

      rootNode.addChild(childNode);

      expect(rootNode.getChildren()).toEqual([childNode]);
      expect(childNode.parent).toBe(rootNode);
    });
  });

  describe('insertChild()', () => {
    it('add node between two existing child nodes', () => {
      const rootNode = new TestTreeNode();
      const childNode = new TestTreeNode();
      const childNode2 = new TestTreeNode();

      rootNode.addChild(childNode);
      rootNode.addChild(childNode2);

      const childNode3 = new TestTreeNode();
      rootNode.insertChild(childNode3, 1);

      expect(rootNode.getChildren()).toEqual([childNode, childNode2, childNode3]);
    });
  });

  describe('removeChild()', () => {
    it('remove an unwanted child node', () => {
      const rootNode = new TestTreeNode();
      const childNode = new TestTreeNode();

      rootNode.addChild(childNode);

      rootNode.removeChild(childNode);

      expect(rootNode.getChildren()).toHaveLength(0);
    });
  });

  describe('replaceChild()', () => {
    it('replace the child of a node with a different node', () => {
      const rootNode = new TestTreeNode();
      const childNode = new TestTreeNode();

      rootNode.addChild(childNode);

      const childNode2 = new TestTreeNode();
      rootNode.replaceChild(childNode, childNode2);

      expect(rootNode.getChildren()).toEqual([childNode2]);
    });
  });

  describe('swapChild()', () => {
    it('swap the position of two child nodes', () => {
      const rootNode = new TestTreeNode();
      const childNode = new TestTreeNode();
      const childNode2 = new TestTreeNode();

      rootNode.addChild(childNode);
      rootNode.addChild(childNode2);

      expect(rootNode.getChildren()).toEqual([childNode, childNode2]);

      rootNode.swapChild(childNode, childNode2);

      expect(rootNode.getChildren()).toEqual([childNode2, childNode]);
    });
  });

  describe('find()', () => {
    it('can find itself', () => {
      const rootNode = new TestTreeNode();

      const findFunc = (node: TreeNode) => node === rootNode;
      expect(rootNode.find(findFunc)).toEqual(rootNode);
    });

    it('can find immediate child node', () => {
      const rootNode = new TestTreeNode();
      const childNode = new TestTreeNode();

      rootNode.addChild(childNode);

      const findFunc = (node: TreeNode) => node === childNode;
      expect(rootNode.find(findFunc)).toEqual(childNode);
    });

    it('can find grandchild node', () => {
      const rootNode = new TestTreeNode();
      const childNode = new TestTreeNode();
      const grandChildNode = new TestTreeNode();

      rootNode.addChild(childNode);
      childNode.addChild(grandChildNode);

      const findFunc = (node: TreeNode) => node === grandChildNode;
      expect(rootNode.find(findFunc)).toEqual(grandChildNode);
    });
  });

  describe('findAncestor()', () => {
    it('cannot find itself', () => {
      const rootNode = new TestTreeNode();

      const findFunc = (node: TreeNode) => node === rootNode;
      expect(rootNode.findAncestor(findFunc)).not.toEqual(rootNode);
    });

    it('can find immediate parent node', () => {
      const rootNode = new TestTreeNode();
      const childNode = new TestTreeNode();

      rootNode.addChild(childNode);

      const findFunc = (node: TreeNode) => node === rootNode;
      expect(childNode.findAncestor(findFunc)).toEqual(rootNode);
    });

    it('can find grandparent node', () => {
      const rootNode = new TestTreeNode();
      const childNode = new TestTreeNode();
      const grandChildNode = new TestTreeNode();

      rootNode.addChild(childNode);
      childNode.addChild(grandChildNode);

      const findFunc = (node: TreeNode) => node === rootNode;
      expect(grandChildNode.findAncestor(findFunc)).toEqual(rootNode);
    });
  });

  describe('findChild()', () => {
    it('cannot find itself', () => {
      const rootNode = new TestTreeNode();

      const findFunc = (node: TreeNode) => node === rootNode;
      expect(rootNode.findChild(findFunc)).not.toEqual(rootNode);
    });

    it('can find immediate child node', () => {
      const rootNode = new TestTreeNode();
      const childNode = new TestTreeNode();

      rootNode.addChild(childNode);

      const findFunc = (node: TreeNode) => node === childNode;
      expect(rootNode.findChild(findFunc)).toEqual(childNode);
    });

    it('can find grandchild node', () => {
      const rootNode = new TestTreeNode();
      const childNode = new TestTreeNode();
      const grandChildNode = new TestTreeNode();

      rootNode.addChild(childNode);
      childNode.addChild(grandChildNode);

      const findFunc = (node: TreeNode) => node === grandChildNode;
      expect(rootNode.findChild(findFunc)).toEqual(grandChildNode);
    });
  });
});
