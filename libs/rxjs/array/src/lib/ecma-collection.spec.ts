import { marbles } from 'rxjs-marbles';
import { of } from 'rxjs';
import {
  arrayBufferFromTypedArray,
  arrayFromTypedArray,
  copyWithin,
  dataViewFromArrayBuffer,
  filterArray,
  fromArray,
  fromArrayOf,
  isArray,
  mapArray,
  mapDelete,
  mapGet,
  mapGroupBy,
  mapHas,
  mapSet,
  mapSize,
  objectAssign,
  objectGroupBy,
  objectMerge,
  reduceRight,
  toReversed,
  toSorted,
  typedArrayFromArrayBuffer,
  withIndex,
} from '@rxjs-ninja/rxjs-array';

describe('ECMAScript collection operators', () => {
  it(
    'mapArray and filterArray',
    marbles((m) => {
      const input = m.hot('-a-|', { a: [1, 2, 3] });
      m.expect(input.pipe(mapArray((n) => n * 2))).toBeObservable(m.cold('-x-|', { x: [2, 4, 6] }));
      m.expect(input.pipe(filterArray((n) => n > 1))).toBeObservable(m.cold('-x-|', { x: [2, 3] }));
    }),
  );

  it(
    'reduceRight',
    marbles((m) => {
      const input = m.hot('-a-|', { a: [1, 2, 3] });
      m.expect(input.pipe(reduceRight((acc, n) => `${acc}${n}`, ''))).toBeObservable(m.cold('-x-|', { x: '321' }));
    }),
  );

  it(
    'copyWithin, toSorted, toReversed, withIndex',
    marbles((m) => {
      const input = m.hot('-a-|', { a: [1, 2, 3, 4] });
      m.expect(input.pipe(copyWithin(0, 2))).toBeObservable(m.cold('-x-|', { x: [3, 4, 3, 4] }));
      m.expect(input.pipe(toSorted())).toBeObservable(m.cold('-x-|', { x: [1, 2, 3, 4] }));
      m.expect(input.pipe(toReversed())).toBeObservable(m.cold('-x-|', { x: [4, 3, 2, 1] }));
      m.expect(input.pipe(withIndex(1, 9))).toBeObservable(m.cold('-x-|', { x: [1, 9, 3, 4] }));
    }),
  );

  it(
    'fromArray and fromArrayOf',
    marbles((m) => {
      m.expect(fromArray('abc')).toBeObservable(m.cold('(x|)', { x: ['a', 'b', 'c'] }));
      m.expect(fromArrayOf(1, 2, 3)).toBeObservable(m.cold('(x|)', { x: [1, 2, 3] }));
    }),
  );

  it(
    'isArray',
    marbles((m) => {
      const input = m.hot('-a-b-|', { a: [1], b: 'x' });
      m.expect(input.pipe(isArray())).toBeObservable(m.cold('-t-f-|', { t: true, f: false }));
    }),
  );

  it(
    'map operators on Map',
    marbles((m) => {
      const mapInput = m.hot('-a-|', { a: new Map([['k', 1]]) });
      m.expect(mapInput.pipe(mapGet('k'))).toBeObservable(m.cold('-x-|', { x: 1 }));
      m.expect(mapInput.pipe(mapHas('k'))).toBeObservable(m.cold('-t-|', { t: true }));
      m.expect(mapInput.pipe(mapSize())).toBeObservable(m.cold('-x-|', { x: 1 }));
      m.expect(mapInput.pipe(mapSet('z', 2))).toBeObservable(
        m.cold('-x-|', { x: new Map([['k', 1], ['z', 2]]) }),
      );
      m.expect(mapInput.pipe(mapDelete('k'))).toBeObservable(m.cold('-x-|', { x: new Map() }));
    }),
  );

  it(
    'objectAssign, objectMerge, objectGroupBy, mapGroupBy',
    marbles((m) => {
      const obj = m.hot('-a-|', { a: { a: 1 } });
      m.expect(obj.pipe(objectAssign({ b: 2 }))).toBeObservable(m.cold('-x-|', { x: { a: 1, b: 2 } }));
      m.expect(obj.pipe(objectMerge({ c: 3 }))).toBeObservable(m.cold('-x-|', { x: { a: 1, c: 3 } }));
      const items = m.hot('-a-|', { a: ['x', 'xy', 'y'] });
      m.expect(items.pipe(objectGroupBy((s) => s.length))).toBeObservable(
        m.cold('-x-|', { x: { 1: ['x', 'y'], 2: ['xy'] } }),
      );
      m.expect(items.pipe(mapGroupBy((s) => s.length))).toBeObservable(
        m.cold('-x-|', {
          x: new Map([
            [1, ['x', 'y']],
            [2, ['xy']],
          ]),
        }),
      );
    }),
  );

  it(
    'typed array conversions',
    marbles((m) => {
      const buffer = new ArrayBuffer(4);
      const view = new Uint8Array(buffer);
      view[0] = 1;
      m.expect(of(view).pipe(arrayBufferFromTypedArray())).toBeObservable(m.cold('(b|)', { b: buffer }));
      m.expect(of(buffer).pipe(typedArrayFromArrayBuffer(Uint8Array))).toBeObservable(
        m.cold('(v|)', { v: new Uint8Array(buffer) }),
      );
      m.expect(of(buffer).pipe(dataViewFromArrayBuffer())).toBeObservable(
        m.cold('(d|)', { d: new DataView(buffer) }),
      );
      m.expect(of(view).pipe(arrayFromTypedArray())).toBeObservable(m.cold('(a|)', { a: [1, 0, 0, 0] }));
    }),
  );
});
