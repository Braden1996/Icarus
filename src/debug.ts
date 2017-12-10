import CONFIG from './config';

class DebugType {
  constructor (
    public object: Object | Object[],
    public convert: (someVariable: any) => string
  ) {}

  canConvert(someVariable: any) {
    const objects = Array.isArray(this.object) ? this.object : [this.object];
    const findFunc = (obj: any) => someVariable instanceof obj;
    return objects.find(findFunc) !== undefined;
  }
}

// TODO: add more DEBUG_TYPES!
const DEBUG_TYPES = [
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
  if (CONFIG.DEBUG_ENABLED) Phoenix.log('DEBUG:' + toLog);
}

export default function debug(...args: any[]) {
  const spaceAfter = (i: number) => ((i < (args.length - 1)) ? '' : ' ');
  const argStr = (arg: any, i: number) => debugAny(arg) + spaceAfter(i);
  const outputStr = args.reduce((str, a, i) => str + argStr(a, i), '');
  output(outputStr);
}
