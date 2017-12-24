import CONFIG from '../config';

function mapVariable(someVariable: any): any {
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
