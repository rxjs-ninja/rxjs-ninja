import { observe } from 'rxjs-marbles/jest';
import { reduce, take, tap } from 'rxjs/operators';
import { fromRandomCryptoInt } from './from-random-crypto-int';

describe('fromRandomCryptoInt', () => {
  it(
    'should emit integers in the given inclusive range',
    observe(() =>
      fromRandomCryptoInt(0, 5).pipe(
        take(20),
        reduce<number, number[]>((acc, val) => [...acc, val], []),
        tap((values) => {
          expect(values.every((v) => Number.isInteger(v) && v >= 0 && v <= 5)).toBe(true);
        }),
      ),
    ),
  );
});