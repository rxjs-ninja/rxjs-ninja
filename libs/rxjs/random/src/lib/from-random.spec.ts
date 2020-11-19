import { observe } from 'rxjs-marbles/jest';
import { reduce, take, tap } from 'rxjs/operators';
import { fromRandom } from './from-random';

describe('fromRandom', () => {
  it(
    'should create an array of random numbers',
    observe(() =>
      fromRandom().pipe(
        take(5),
        reduce<number, number[]>((acc, val) => [...acc, val], []),
        tap((value) => {
          const check = value.filter((v) => typeof v === 'number' && v > 0 && v < 1);
          expect(check.length).toBe(5);
        }),
      ),
    ),
  );

  it(
    'should create an array of random numbers between 5 and 10',
    observe(() =>
      fromRandom(5, 10).pipe(
        take(5),
        reduce<number, number[]>((acc, val) => [...acc, val], []),
        tap((value) => {
          const check = value.filter((v) => typeof v === 'number' && v > 5 && v < 10);
          expect(check.length).toBe(5);
        }),
      ),
    ),
  );
});
