import { of } from 'rxjs';
import { observe } from 'rxjs-marbles/jest';
import { map, reduce, take, tap } from 'rxjs/operators';
import { fromNumber } from './from-number';

describe('fromNumber', () => {
  it(
    'should create a sequence of numbers if no input passed, reduce to array, adding `1` to each value',
    observe(() =>
      fromNumber().pipe(
        take(100),
        reduce((a, b) => [...a, b + 1], [] as number[]),
        tap((value) => {
          expect(value.length).toBe(100);
          expect(value[0]).toBe(1);
        }),
      ),
    ),
  );

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
