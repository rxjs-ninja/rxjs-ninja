import { marbles } from 'rxjs-marbles';
import { of } from 'rxjs';
import { arrayFromTypedArray } from './array-from-typed-array';

describe('arrayFromTypedArray', () => {
  it(
    'should convert a typed array to a regular array',
    marbles((m) => {
      const buffer = new ArrayBuffer(4);
      const view = new Uint8Array(buffer);
      view[0] = 1;
      m.expect(of(view).pipe(arrayFromTypedArray())).toBeObservable(m.cold('(a|)', { a: [1, 0, 0, 0] }));
    }),
  );
});