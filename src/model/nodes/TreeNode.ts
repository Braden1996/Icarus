export interface TreeNodeJSON {
  string: string;
  children: TreeNodeJSON[] | undefined;
}

export default abstract class TreeNode {
  parent: TreeNode | null;
  private children: TreeNode[] = [];

  toString() {
    return this.constructor.name;
  }

  toJSON(): TreeNodeJSON {
    return {
      string: this.toString(),
      children: this.children.length > 0
        ? this.children.map(child => child.toJSON())
        : undefined,
    };
  }

  isEqual(compareNode: TreeNode): boolean {
    return compareNode === this;
  }

  remove() {
    const insertIndex = this.parent!.findChildIndex(child => child === this);
    for (const child of this.children.reverse()) {
      child.parent = null;
      this.parent!.insertChild(child, insertIndex);
    }
    this.parent!.removeChild(this);
  }

  getChildren() {
    return this.children.slice();
  }

  addChild(node: TreeNode) {
    this.insertChild(node, this.children.length);
  }

  removeChild(child: TreeNode) {
    child.parent = null;
    this.children = this.children.filter(c => c !== child);
  }

  insertChild(child: TreeNode, index: number) {
    if (child.parent) child.parent.removeChild(child);
    child.parent = this;
    this.children.splice(index, 0, child);
  }

  replaceChild(oldChild: TreeNode, newChild: TreeNode) {
    const oldChildIndex = this.findChildIndex(child => child === oldChild);
    this.insertChild(newChild, oldChildIndex);
    this.removeChild(oldChild);
  }

  swapChild(child1: TreeNode, child2: TreeNode) {
    const child1Index = this.findChildIndex(child => child === child1);
    const child2Index = this.findChildIndex(child => child === child2);
    this.children[child1Index] = child2;
    this.children[child2Index] = child1;
  }

  find(comparisonFunction: (node: TreeNode) => boolean): TreeNode | undefined {
    if (comparisonFunction(this)) return this;
    return this.findChild(comparisonFunction);
  }

  findAncestor(comparisonFunction: (ancestor: TreeNode) => boolean): TreeNode | undefined {
    if (!this.parent) return;
    if (comparisonFunction(this.parent)) return this.parent;
    return this.parent.findAncestor(comparisonFunction);
  }

  findChild(comparisonFunction: (child: TreeNode) => boolean): TreeNode | undefined {
    for (let child of this.children) {
      const found = child.find(comparisonFunction);
      if (found) return found;
    }
  }

  protected findChildIndex(comparisonFunction: (child: TreeNode) => boolean) {
    return this.children.findIndex(comparisonFunction);
  }
}
