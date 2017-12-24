import CONFIG from '../config';

function variableToString(someVariable: any): string {
  return JSON.stringify(someVariable, null, CONFIG.DEBUG_JSON_SPACE);
}

function output(toLog: string) {
  if (CONFIG.DEBUG_ENABLED) Phoenix.log('DEBUG: ' + toLog);
}

export function debug(...args: any[]) {
  const spaceAfter = (i: number) => ((i === (args.length - 1)) ? '' : ' ');
  const argStr = (a: any, i: number) => variableToString(a) + spaceAfter(i);
  return args.reduce((str, a, i) => str + argStr(a, i), '');
}

export default function debugOutput(...args: any[]) {
  output(debug(...args));
}
