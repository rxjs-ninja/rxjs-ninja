import { map, reduce, tap } from 'rxjs/operators';
import { fromNumber } from '@tinynodes/rxjs-number';
import { observe } from 'rxjs-marbles/jest';

describe('fromNumber', () => {
  it(
    'should create boolean observable from boolean value',
    observe(() =>
      fromNumber(5).pipe(
        map((val) => val * 2),
        tap((value) => expect(value).toBe(10)),
      ),
    ),
  );

  it(
    'should create boolean observable from boolean value',
    observe(() =>
      fromNumber([1, 2, 3, 4]).pipe(
        reduce((acc, val) => acc + val),
        tap((value) => expect(value).toBe(10)),
      ),
    ),
  );
});
