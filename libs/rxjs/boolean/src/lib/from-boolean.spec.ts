import { filter, map, reduce, tap } from 'rxjs/operators';
import { fromBoolean } from '@tinynodes/rxjs-boolean';
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
    'should create boolean observable from string value',
    observe(() => fromBoolean('').pipe(tap((value) => expect(typeof value).toBe('boolean')))),
  );

  it(
    'should create boolean observable from number value',
    observe(() => fromBoolean(0).pipe(tap((value) => expect(typeof value).toBe('boolean')))),
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

  it(
    'should emit boolean observables from string values',
    observe(() =>
      fromBoolean(['', 'true', '', 'true', '']).pipe(
        filter(Boolean),
        reduce((acc) => acc + 1, 0),
        tap((value) => expect(value).toBe(2)),
      ),
    ),
  );

  it(
    'should emit boolean observables from number values',
    observe(() =>
      fromBoolean([0, 1, 0, 1, 0]).pipe(
        filter(Boolean),
        reduce((acc) => acc + 1, 0),
        tap((value) => expect(value).toBe(2)),
      ),
    ),
  );
});
