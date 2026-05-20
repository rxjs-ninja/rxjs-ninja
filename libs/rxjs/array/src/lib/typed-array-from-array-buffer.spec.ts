import { marbles } from 'rxjs-marbles';
import { of } from 'rxjs';
import { typedArrayFromArrayBuffer } from './typed-array-from-array-buffer';

describe('typedArrayFromArrayBuffer', () => {
  it(
    'should create a typed array view of the buffer',
    marbles((m) => {
      const buffer = new ArrayBuffer(4);
      m.expect(of(buffer).pipe(typedArrayFromArrayBuffer(Uint8Array))).toBeObservable(
        m.cold('(v|)', { v: new Uint8Array(buffer) }),
      );
    }),
  );
});