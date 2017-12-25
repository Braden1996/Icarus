import CONFIG from 'config';
import { isApp, isWindow } from './typeGuards';

function mapVariable(someVariable: any, depth = Infinity): any {
  if (!(someVariable instanceof Object)) {
    return someVariable;
  } else if (depth < 0) {
    return someVariable.toString();
  } else {
    if (isApp(someVariable)) {
      return mapVariable({
        type: 'App',
        name: someVariable.name(),
        hash: someVariable.hash(),
        isActive: someVariable.isActive(),
        isHidden: someVariable.isHidden(),
        isTerminated: someVariable.isTerminated(),
        windows: someVariable.windows(),
      },  depth === Infinity ? 2 : depth);
    } else if (isWindow(someVariable)) {
      const debugWindow = mapVariable({
        type: 'Window',
        title: someVariable.title(),
        hash: someVariable.hash(),
        isFullScreen: someVariable.isFullScreen(),
        isMain: someVariable.isMain(),
        isMinimized: someVariable.isMinimized(),
        isNormal: someVariable.isNormal(),
        isVisible: someVariable.isVisible(),
        app: someVariable.app(),
      }, depth === Infinity ? 3 : depth);

      if (debugWindow.app && debugWindow.app.windows instanceof Array) {
        debugWindow.app.otherWindows = debugWindow.app.windows
          .filter((w: any) => w.hash !== someVariable.hash());
        delete debugWindow.app.windows;
      }
      return debugWindow;
    } else if (someVariable instanceof Array) {
      return someVariable.map(v => mapVariable(v, depth - 1));
    } else if (someVariable.toJSON) {
      return mapVariable(someVariable.toJSON(), depth - 1);
    } else if (someVariable.constructor === Object) {
      return Object.assign({}, ...Object.keys(someVariable).map(
        k => ({[k]: mapVariable(someVariable[k], depth - 1)})
      ));
    }
  }
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
