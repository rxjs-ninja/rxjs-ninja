import { observe } from 'rxjs-marbles/jest';
import { reduce, take, tap } from 'rxjs/operators';
import { fromRandomStr } from '@rxjs-ninja/rxjs-random';

describe('fromRandomStr', () => {
  it(
    'should create an array of random strings of default length 10',
    observe(() =>
      fromRandomStr().pipe(
        take(5),
        reduce<string, string[]>((acc, val) => [...acc, val], []),
        tap((value) => {
          const check = value.filter((v) => typeof v === 'string' && v.length === 10);
          expect(check.length).toBe(5);
        }),
      ),
    ),
  );

  it(
    'should create an array of random strings of passed length 5',
    observe(() =>
      fromRandomStr(5).pipe(
        take(5),
        reduce<string, string[]>((acc, val) => [...acc, val], []),
        tap((value) => {
          const check = value.filter((v) => typeof v === 'string' && v.length === 5);
          expect(check.length).toBe(5);
        }),
      ),
    ),
  );

  it(
    'should create an array of random strings of passed length 5 with additional options',
    observe(() =>
      fromRandomStr(5, 0, { caps: true, lower: true, number: true, special: true }).pipe(
        take(5),
        reduce<string, string[]>((acc, val) => [...acc, val], []),
        tap((value) => {
          const check = value.filter((v) => typeof v === 'string' && v.length === 5);
          expect(check.length).toBe(5);
        }),
      ),
    ),
  );

  it(
    'should create an array of random strings of passed length 5 with defaults disabled',
    observe(() =>
      fromRandomStr(5, 0, { caps: false, lower: false, number: true, special: true }).pipe(
        take(5),
        reduce<string, string[]>((acc, val) => [...acc, val], []),
        tap((value) => {
          const check = value.filter((v) => typeof v === 'string' && v.length === 5);
          expect(check.length).toBe(5);
        }),
      ),
    ),
  );
});
