import { observe } from 'rxjs-marbles/jest';
import { reduce, take, tap } from 'rxjs/operators';
import { fromRandomCryptoCharset } from './from-random-crypto-str';

describe('fromRandomCryptoCharset', () => {
  it(
    'should sample only from the given charset',
    observe(() =>
      fromRandomCryptoCharset(4, 'ab').pipe(
        take(10),
        tap((value) => {
          expect(value).toMatch(/^[ab]{4}$/);
        }),
      ),
    ),
  );
});