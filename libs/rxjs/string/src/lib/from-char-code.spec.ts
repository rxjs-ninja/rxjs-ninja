import { tap } from 'rxjs/operators';
import { fromCharCode } from '@rxjs-ninja/rxjs-string';
import { observe } from 'rxjs-marbles/jest';

describe('fromCharCode', () => {
  it(
    'should create an ASCII character from a single character code',
    observe(() => fromCharCode(65).pipe(tap((value) => expect(value).toBe('A')))),
  );

  it(
    'should create an ASCII character from arguments of single character code',
    observe(() => fromCharCode(65, 66, 67, 68).pipe(tap((value) => expect(value).toBe('ABCD')))),
  );

  it(
    'should create an ASCII characters from a single character code',
    observe(() => fromCharCode([65, 66, 67, 68]).pipe(tap((value) => expect(value).toBe('ABCD')))),
  );
});
