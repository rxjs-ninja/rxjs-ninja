import { observe } from 'rxjs-marbles/jest';
import { reduce, take, tap } from 'rxjs/operators';
import { fromRandom } from './from-random';
import { fromCryptoRandom } from './from-crypto-random';
import TypedArray = NodeJS.TypedArray;

describe('fromCryptoRandom', () => {
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
      fromCryptoRandom().pipe(
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
