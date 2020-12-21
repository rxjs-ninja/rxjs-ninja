import { tap } from 'rxjs/operators';
import { fromCodePoint } from '@rxjs-ninja/rxjs-string';
import { observe } from 'rxjs-marbles/jest';

describe('fromCodePoint', () => {
  it(
    'should create string value from passed code points',
    observe(() => fromCodePoint(9731).pipe(tap((value) => expect(value).toBe('☃')))),
  );

  it(
    'should create string value from passed code points',
    observe(() => fromCodePoint(9731, 9733, 9842).pipe(tap((value) => expect(value).toBe('☃★♲')))),
  );
  it(
    'should create string value from passed code points',
    observe(() => fromCodePoint([9731, 9733, 9842]).pipe(tap((value) => expect(value).toBe('☃★♲')))),
  );
});
