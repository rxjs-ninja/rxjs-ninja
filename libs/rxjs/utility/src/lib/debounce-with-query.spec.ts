import { debounceWithQuery } from '@rxjs-ninja/rxjs-utility';
import { from, of } from 'rxjs';
import { observe } from 'rxjs-marbles/jest';
import { tap } from 'rxjs/operators';

describe('debounceWithQuery', () => {
  it(
    'should create an array of random 4-byte numbers by default',
    observe(() =>
      from(['t', 'te', 'tes', 'test']).pipe(
        debounceWithQuery(500, (query) => of(query)),
        tap((value) => {
          expect(value).toBe('test');
        }),
      ),
    ),
  );
});
