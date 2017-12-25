import CONFIG from 'config';
import { isApp, isWindow } from './typeGuards';

function mapVariable(someVariable: any, depth = Infinity): any {
  if (depth < 0) { return 'MAX DEPTH'}

  if (isApp(someVariable)) {
    const nextDepth = depth === Infinity ? 0 : depth - 1;
    return {
      type: 'App',
      name: someVariable.name(),
      hash: someVariable.hash(),
      isActive: someVariable.isActive(),
      isHidden: someVariable.isHidden(),
      isTerminated: someVariable.isTerminated(),
      windows: someVariable.windows()
        .map(w => mapVariable(w, nextDepth)),
    }
  } else if (isWindow(someVariable)) {
    const nextDepth = depth === Infinity ? 1 : depth - 1;
    const app = mapVariable(someVariable.app(), nextDepth);
    if (app instanceof Object) {
      app.otherWindows = app.windows
        .filter((w: any) => w.hash !== someVariable.hash());
      delete app.windows;
    }

    return {
      type: 'Window',
      title: someVariable.title(),
      hash: someVariable.hash(),
      isFullScreen: someVariable.isFullScreen(),
      isMain: someVariable.isMain(),
      isMinimized: someVariable.isMinimized(),
      isNormal: someVariable.isNormal(),
      isVisible: someVariable.isVisible(),
      app
    };
  }
  return someVariable;
}

function variableToString(someVariable: any): string {
  return JSON.stringify(someVariable, null, CONFIG.DEBUG_JSON_SPACE);
}

export function getDebugString(...inArgs: any[]) {
  const args = inArgs.map(someVariable => mapVariable(someVariable));
  const spaceAfter = (i: number) => ((i === (args.length - 1)) ? '' : ' ');
  const argStr = (a: any, i: number) => variableToString(a) + spaceAfter(i);
  const debugString = args.reduce((str, a, i) => str + argStr(a, i), '');
  return debugString;
}

export default function debug(...inArgs: any[]) {
  Phoenix.log(getDebugString(...inArgs));
}
