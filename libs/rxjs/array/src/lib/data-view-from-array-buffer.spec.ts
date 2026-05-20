import { marbles } from 'rxjs-marbles';
import { of } from 'rxjs';
import { dataViewFromArrayBuffer } from './data-view-from-array-buffer';

describe('dataViewFromArrayBuffer', () => {
  it(
    'should create a DataView of the buffer',
    marbles((m) => {
      const buffer = new ArrayBuffer(4);
      m.expect(of(buffer).pipe(dataViewFromArrayBuffer())).toBeObservable(
        m.cold('(d|)', { d: new DataView(buffer) }),
      );
    }),
  );
});