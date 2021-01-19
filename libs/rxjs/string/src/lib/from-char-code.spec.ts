import { catchError, tap } from 'rxjs/operators';
import { fromCharCode } from '@rxjs-ninja/rxjs-string';
import { observe } from 'rxjs-marbles/jest';
import { of } from 'rxjs';

describe('fromCharCode', () => {
  it(
    'should create an ASCII string from a single character code',
    observe(() => fromCharCode(65).pipe(tap((value) => expect(value).toBe('A')))),
  );

  it(
    'should create an ASCII string from an argument list of character codes',
    observe(() => fromCharCode(65, 66, 67, 68).pipe(tap((value) => expect(value).toBe('ABCD')))),
  );

  it(
    'should create an ASCII string from an array of character codes',
    observe(() => fromCharCode([65, 66, 67, 68]).pipe(tap((value) => expect(value).toBe('ABCD')))),
  );

  it(
    'should create an ASCII string from a single Observable character code',
    observe(() => fromCharCode(of(65)).pipe(tap((value) => expect(value).toBe('A')))),
  );

  it(
    'should create an ASCII string from an Observable array of character codes',
    observe(() => fromCharCode(of([65, 66, 67, 68])).pipe(tap((value) => expect(value).toBe('ABCD')))),
  );

  it(
    'should create an ASCII string from an Promise single of character codes',
    observe(() => fromCharCode(Promise.resolve(65)).pipe(tap((value) => expect(value).toBe('A')))),
  );

  it(
    'should create an ASCII string from an Promise array of character codes',
    observe(() => fromCharCode(Promise.resolve([65, 66, 67, 68])).pipe(tap((value) => expect(value).toBe('ABCD')))),
  );

  it(
    'should create an Error from a failed promise',
    observe(() =>
      fromCharCode(Promise.reject('RxJS Ninja')).pipe(
        catchError((error) => {
          expect(error).toBe('RxJS Ninja');
          return of(true);
        }),
      ),
    ),
  );
});
