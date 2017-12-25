export function isApp(someVariable: any): someVariable is App {
  return someVariable.processIdentifier !== undefined
    && someVariable.bundleIdentifier !== undefined
    && someVariable.name !== undefined
    && someVariable.icon !== undefined
    && someVariable.isActive !== undefined
    && someVariable.isHidden !== undefined
    && someVariable.isTerminated !== undefined
    && someVariable.mainWindow !== undefined
    && someVariable.windows !== undefined
    && someVariable.activate !== undefined
    && someVariable.focus !== undefined
    && someVariable.show !== undefined
    && someVariable.hide !== undefined
    && someVariable.terminate !== undefined;
}


export function isWindow(someVariable: any): someVariable is Window {
  return someVariable.others !== undefined
    && someVariable.title !== undefined
    && someVariable.isMain !== undefined
    && someVariable.isNormal !== undefined
    && someVariable.isFullScreen !== undefined
    && someVariable.isMinimized !== undefined
    && someVariable.isVisible !== undefined
    && someVariable.app !== undefined
    && someVariable.screen !== undefined
    && someVariable.spaces !== undefined
    && someVariable.topLeft !== undefined
    && someVariable.size !== undefined
    && someVariable.frame !== undefined
    && someVariable.setTopLeft !== undefined
    && someVariable.setSize !== undefined
    && someVariable.setFrame !== undefined
    && someVariable.setFullScreen !== undefined
    && someVariable.maximize !== undefined
    && someVariable.minimize !== undefined
    && someVariable.unminimize !== undefined
    && someVariable.neighbors !== undefined
    && someVariable.raise !== undefined
    && someVariable.focus !== undefined
    && someVariable.focusClosestNeighbor !== undefined;
}
