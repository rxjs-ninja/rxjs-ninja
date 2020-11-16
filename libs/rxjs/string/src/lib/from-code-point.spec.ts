import { tap } from 'rxjs/operators';
import { fromCodePoint } from '@tinynodes/rxjs-string';
import { observe } from 'rxjs-marbles/jest';

describe('fromCodePoint', () => {
  it(
    'should create string value from passed code points',
    observe(() => fromCodePoint([9731, 9733, 9842]).pipe(tap((value) => expect(value).toBe('☃★♲')))),
  );
});
