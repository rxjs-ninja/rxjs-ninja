import { map, reduce, tap } from 'rxjs/operators';
import { fromString } from '@rxjs-ninja/rxjs-string';
import { observe } from 'rxjs-marbles/jest';

describe('fromString', () => {
  it(
    'should create observable from string value',
    observe(() =>
      fromString('TESTING').pipe(
        map((val) => val.toLowerCase()),
        tap((value) => expect(value).toBe('testing')),
      ),
    ),
  );

  it(
    'should create observable from array of string value',
    observe(() =>
      fromString(['TESTING', 'IS', 'FUN']).pipe(
        map((val) => val.toLowerCase()),
        reduce((acc, val) => `${acc} ${val}`, ''),
        map((val) => val.trim()),
        tap((value) => expect(value).toBe('testing is fun')),
      ),
    ),
  );
});
