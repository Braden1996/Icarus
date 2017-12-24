import CONFIG from 'phoenix/config';
import { getDebugString as debug } from 'phoenix/utils/debug';

describe('debug()', () => {
  let initialSpace: string | number;

  beforeEach(() => {
    initialSpace = CONFIG.DEBUG_JSON_SPACE;
    CONFIG.DEBUG_JSON_SPACE = 0;
  });

  afterEach(() => {
    CONFIG.DEBUG_JSON_SPACE = initialSpace;
  });

  it('should output JSON the given plain string', () => {
    const debugVariable = 'Hello world!';
    expect(debug(debugVariable)).toBe('"Hello world!"');
  });

  it('should output JSON when given an array', () => {
    const debugVariable = ['a', 'b', 'c'];
    expect(debug(debugVariable)).toBe('["a","b","c"]');
  });

  it('should output indented JSON when given an array', () => {
    CONFIG.DEBUG_JSON_SPACE = 2;
    const debugVariable = ['a', 'b', 'c'];
    expect(debug(debugVariable)).toBe('[\n  "a",\n  "b",\n  "c"\n]');
  });

  it('should utilise the `toJSON()` method of a given class instance', () => {
    class SomeClass {
      toJSON() {
        return {
          name: 'Denethor',
          children: ['Boromir', 'Faramir']
        };
      }
    }

    const debugVariable = new SomeClass();
    expect(debug(debugVariable)).toBe('{\"name\":\"Denethor\",\"children\":[\"Boromir\",\"Faramir\"]}');
  });
});
