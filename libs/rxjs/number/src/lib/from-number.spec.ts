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
    'should create observable from promise number value',
    observe(() =>
      fromNumber(Promise.resolve(5)).pipe(
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
    'should create observable from argument list of number values',
    observe(() =>
      fromNumber(1, 2, 3, 4).pipe(
        reduce((acc, val) => acc + val),
        tap((value) => expect(value).toBe(10)),
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
