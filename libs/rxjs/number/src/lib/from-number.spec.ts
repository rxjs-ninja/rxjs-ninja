import { map, reduce, tap } from 'rxjs/operators';
import { fromNumber } from '@rxjs-ninja/rxjs-number';
import { observe } from 'rxjs-marbles/jest';
import { of } from 'rxjs';

describe('fromNumber', () => {
  it(
    'should create observable from number value',
    observe(() =>
      fromNumber(5).pipe(
        map((val) => val * 2),
        tap((value) => expect(value).toBe(10)),
      ),
    ),
  );

  it(
    'should create observable from observable number value',
    observe(() =>
      fromNumber(of(5)).pipe(
        map((val) => val * 2),
        tap((value) => expect(value).toBe(10)),
      ),
    ),
  );

  it(
    'should create observable from observable number array',
    observe(() =>
      fromNumber(of([5, 10, 20])).pipe(
        reduce((a, b) => a + b, 0),
        tap((value) => expect(value).toBe(35)),
      ),
    ),
  );

  it(
    'should create observable from array of values',
    observe(() =>
      fromNumber([1, 2, 3, 4]).pipe(
        reduce((acc, val) => acc + val),
        tap((value) => expect(value).toBe(10)),
      ),
    ),
  );
});
