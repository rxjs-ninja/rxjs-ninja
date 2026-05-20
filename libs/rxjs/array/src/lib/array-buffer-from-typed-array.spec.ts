import { marbles } from 'rxjs-marbles';
import { of } from 'rxjs';
import { arrayBufferFromTypedArray } from './array-buffer-from-typed-array';

describe('arrayBufferFromTypedArray', () => {
  it(
    'should emit the underlying ArrayBuffer',
    marbles((m) => {
      const buffer = new ArrayBuffer(4);
      const view = new Uint8Array(buffer);
      view[0] = 1;
      m.expect(of(view).pipe(arrayBufferFromTypedArray())).toBeObservable(m.cold('(b|)', { b: buffer }));
    }),
  );
});