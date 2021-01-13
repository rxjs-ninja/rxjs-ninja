import { observe } from 'rxjs-marbles/jest';
import { toWritableStream } from '@rxjs-ninja/rxjs-utility';
import { catchError, map, reduce, take, tap } from 'rxjs/operators';
import { from, of, throwError } from 'rxjs';
import { WritableStream } from 'web-streams-polyfill/ponyfill';

describe('toWritableStream', () => {
  it(
    'should write to a WritableStream passed as parameter',
    observe(() => {
      let output = '';
      const stream = new WritableStream({
        write: (val) => {
          output += val;
        },
        close: () => expect(output).toBe('12345'),
      });

      return from([1, 2, 3, 4, 5]).pipe(toWritableStream(stream));
    }),
  );

  it(
    'should write to a WritableStreamDefaultWriter passed as parameter',
    observe(() => {
      let output = '';
      const stream = new WritableStream({
        write: (val) => {
          output += val;
        },
        close: () => expect(output).toBe('12345'),
      });
      const writer = stream.getWriter();

      return from([1, 2, 3, 4, 5]).pipe(toWritableStream(writer));
    }),
  );

  it(
    'should end writing to the writable stream on subscription end',
    observe(() => {
      let output = '';
      const stream = new WritableStream({
        write: (val) => {
          output += val;
        },
        close: () => expect(output).toBe('123'),
      });
      return from([1, 2, 3, 4, 5]).pipe(take(3), toWritableStream(stream));
    }),
  );

  it(
    'should end writing to the writable stream on error',
    observe(() => {
      let output = '';
      const stream = new WritableStream({
        write: (val) => {
          output += val;
        },
        close: () => expect(output).toBe('123'),
      });

      return from([1, 2, 3, 4, 5]).pipe(
        map((val) => {
          if (val < 4) {
            return val;
          } else {
            return throwError('Number is 4');
          }
        }),
        toWritableStream(stream),
        catchError(() => of(true)),
      );
    }),
  );

  it(
    'should no longer write when stream is closed',
    observe(() => {
      const ctrl = new AbortController();

      let output = '';
      const stream = new WritableStream({
        write: (val) => {
          output += val;
        },
        close: () => expect(output).toBe('123'),
      });

      return from([1, 2, 3, 4, 5]).pipe(
        tap((val) => val === 4 && ctrl.abort()),
        toWritableStream(stream, ctrl.signal),
        reduce((a, b) => a + b, 0),
        tap((val) => expect(val).toBe(15)),
      );
    }),
  );
});
