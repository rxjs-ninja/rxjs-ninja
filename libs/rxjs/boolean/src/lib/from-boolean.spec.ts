import { filter, map, reduce, tap } from 'rxjs/operators';
import { fromBoolean } from '@rxjs-ninja/rxjs-boolean';
import { observe } from 'rxjs-marbles/jest';

describe('fromBoolean', () => {
  it(
    'should create boolean observable from boolean value',
    observe(() =>
      fromBoolean(false).pipe(
        map((val) => !val),
        tap((value) => expect(value).toBeTruthy()),
      ),
    ),
  );

  it(
    'should emit boolean observables from boolean values',
    observe(() =>
      fromBoolean([false, true, false, true, false]).pipe(
        filter(Boolean),
        reduce((acc) => acc + 1, 0),
        tap((value) => expect(value).toBe(2)),
      ),
    ),
  );
});
