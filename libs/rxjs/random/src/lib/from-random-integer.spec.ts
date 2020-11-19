import { observe } from 'rxjs-marbles/jest';
import { reduce, take, tap } from 'rxjs/operators';
import { fromRandomInt } from '@tinynodes/rxjs-random';

describe('fromRandomInt', () => {
  it(
    'should create an array of random integer numbers',
    observe(() =>
      fromRandomInt(0, 10).pipe(
        take(5),
        reduce<number, number[]>((acc, val) => [...acc, val], [] as number[]),
        tap((value) => {
          const check = value.filter((v) => typeof v === 'number' && Number.isInteger(v) && v >= 0 && v <= 10);
          expect(check.length).toBe(5);
        }),
      ),
    ),
  );
});
