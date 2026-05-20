import { observe } from 'rxjs-marbles/jest';
import { reduce, take, tap } from 'rxjs/operators';
import { fromRandomCryptoStr } from './from-random-crypto-str';

describe('fromRandomCryptoStr', () => {
  it(
    'should emit strings using only the selected charset',
    observe(() =>
      fromRandomCryptoStr(12, 0, { caps: true, lower: false, number: true, special: false }).pipe(
        take(5),
        tap((value) => {
          expect(value).toMatch(/^[A-Z0-9]{12}$/);
        }),
      ),
    ),
  );
});