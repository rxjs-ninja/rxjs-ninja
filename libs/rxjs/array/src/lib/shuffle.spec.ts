import { shuffle } from '@rxjs-ninja/rxjs-array';
import { observe } from 'rxjs-marbles/jest';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

describe('shuffle', () => {
  it(
    'should shuffle an array',
    observe(() => {
      const input = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
      return of(input).pipe(
        shuffle(),
        tap((value) => {
          expect(value).not.toStrictEqual(input);
          expect(value).toHaveLength(input.length);
        }),
      );
    }),
  );
});
