import { observe } from 'rxjs-marbles/jest';
import { reduce, take, tap } from 'rxjs/operators';
import { fromRandomCrypto } from './from-random-crypto';
import TypedArray = NodeJS.TypedArray;

describe('fromRandomCrypto', () => {
  beforeAll(() => {
    (window as any)['crypto'] = window.crypto || {
      getRandomValues: (arr: TypedArray) => {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
          result.push(Math.random());
        }
        arr.set(result);
      },
    };
  });

  it(
    'should create an array of random numbers',
    observe(() =>
      fromRandomCrypto().pipe(
        take(5),
        reduce<number, number[]>((acc, val) => [...acc, val], []),
        tap((value) => {
          const check = value.filter((v) => typeof v === 'number');
          expect(check.length).toBe(5);
        }),
      ),
    ),
  );
});
