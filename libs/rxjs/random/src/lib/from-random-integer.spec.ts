import { observe } from 'rxjs-marbles/jest';
import { reduce, take, tap } from 'rxjs/operators';
import { fromRandomInt } from './from-random-integer';

describe('fromRandomInt', () => {
  it(
    'should emit random numbers between 0 and 100',
    observe(() =>
      fromRandomInt().pipe(
        take(5),
        reduce<number, number[]>((acc, val) => [...acc, val], [] as number[]),
        tap((value) => {
          const check = value.filter((v) => typeof v === 'number' && Number.isInteger(v) && v >= 0 && v <= 100);
          expect(check.length).toBe(5);
        }),
      ),
    ),
  );

  it(
    'should create an array of random integer numbers between the passed max and min',
    observe(() =>
      fromRandomInt(5, 10).pipe(
        take(5),
        reduce<number, number[]>((acc, val) => [...acc, val], [] as number[]),
        tap((value) => {
          const check = value.filter((v) => typeof v === 'number' && Number.isInteger(v) && v >= 5 && v <= 10);
          expect(check.length).toBe(5);
        }),
      ),
    ),
  );
});
