const DEBUG_ENABLED = true;

class DebugType {
  constructor (public object: Object | Object[], public convert: (someVariable: any) => string) {}

  canConvert(someVariable: any) {
    const objects = this.object instanceof Array ? this.object : [this.object];
    return objects.find((obj: any) => someVariable instanceof obj) !== undefined;
  }
}

const DEBUG_TYPES = [
  new DebugType(
    Window,
    (theWindow: Window) => debugAny({
      type: 'Window',
      title: theWindow.title(),
      hash: theWindow.hash(),
      isFullScreen: theWindow.isFullScreen(),
      isMain: theWindow.isMain(),
      isMinimized: theWindow.isMinimized(),
      isNormal: theWindow.isNormal(),
      isVisible: theWindow.isVisible(),
    }),
  ),
  new DebugType(
    App,
    (app: App) => debugAny({
      type: 'App',
      name: app.name(),
      hash: app.hash(),
      isActive: app.isActive(),
      isHidden: app.isHidden(),
      isTerminated: app.isTerminated(),
    })
  ),
  new DebugType(
    [Array, Object],
    (json: any[] | Object) => JSON.stringify(json),
  ),
]

function debugAny(someVariable: any): string {
  const debugType = DEBUG_TYPES.find(dType => dType.canConvert(someVariable));

  if (debugType !== undefined) {
    return debugType.convert(someVariable);
  }
  return someVariable.toString();
}

function output(toLog: string) {
  if (DEBUG_ENABLED) Phoenix.log('DEBUG:' + toLog);
}

export default function debug(...args: any[]) {
  const spaceAfter = (i: number) => ((i < (args.length - 1)) ? '' : ' ');
  const argStr = (arg: any, i: number) => debugAny(arg) + spaceAfter(i);
  const outputStr = args.reduce((str, a, i) => str + argStr(a, i), '');
  output(outputStr);
}
