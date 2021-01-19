import { tap } from 'rxjs/operators';
import { fromCodePoint } from '@rxjs-ninja/rxjs-string';
import { observe } from 'rxjs-marbles/jest';
import { of } from 'rxjs';

describe('fromCodePoint', () => {
  it(
    'should create string value from passed code point',
    observe(() => fromCodePoint(9731).pipe(tap((value) => expect(value).toBe('☃')))),
  );
  it(
    'should create string value from passed array of code points',
    observe(() => fromCodePoint([9731, 9733, 9842]).pipe(tap((value) => expect(value).toBe('☃★♲')))),
  );

  it(
    'should create string value from passed Observable code point',
    observe(() => fromCodePoint(of(9731)).pipe(tap((value) => expect(value).toBe('☃')))),
  );

  it(
    'should create string value from passed Observable array of code points',
    observe(() => fromCodePoint(of([9731, 9733, 9842])).pipe(tap((value) => expect(value).toBe('☃★♲')))),
  );
});
