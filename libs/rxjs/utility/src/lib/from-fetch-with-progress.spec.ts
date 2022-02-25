import { of } from 'rxjs';
import { observe } from 'rxjs-marbles/jest';
import { catchError, finalize, tap } from 'rxjs/operators';
import { fromFetchWithProgress } from './from-fetch-with-progress';

describe('fromFetchWithProgress', () => {
  let globalFetch: any;

  const pieces = [0, 25, 50, 75, 100];

  function createFetch(ok: boolean, body: any) {
    return () => {
      return Promise.resolve({
        ok,
        headers: {
          get: () => 5,
        },
        body,
        status: ok ? 200 : 500,
        statusText: ok ? 'ok' : 'Unknown Error',
      });
    };
  }

  beforeEach(() => {
    globalFetch = window.fetch;
  });

  afterEach(() => {
    window.fetch = globalFetch;
  });

  it(
    'should fetch with progress',

    observe(() => {
      window.fetch = createFetch(true, {
        getReader() {
          let i = 0;
          return {
            read() {
              return Promise.resolve(
                i < pieces.length ? { value: [pieces[i++]], done: false } : { value: [], done: true },
              );
            },
          };
        },
      }) as any;

      const addedPercent: number[] = [];
      let finalResult: Uint8Array;

      return fromFetchWithProgress('http://example.com/foo.jpg').pipe(
        tap((value) => (typeof value === 'number' ? addedPercent.push(value) : (finalResult = value))),
        finalize(() => {
          expect(addedPercent).toStrictEqual([0.2, 0.4, 0.6, 0.8, 1]);
          expect(finalResult).toBeInstanceOf(Uint8Array);
        }),
      );
    }),
  );

  it(
    'should return an error on no body',

    observe(() => {
      window.fetch = createFetch(true, undefined) as any;

      return fromFetchWithProgress('http://example.com/foo.jpg').pipe(
        catchError((error) => {
          expect(error.message).toBe('Response body is empty');
          return of(true);
        }),
      );
    }),
  );

  it(
    'should return an error on not ok',

    observe(() => {
      window.fetch = createFetch(false, {}) as any;

      return fromFetchWithProgress('http://example.com/foo.jpg').pipe(
        catchError((error) => {
          expect(error.message).toBe('500: Unknown Error');
          return of(true);
        }),
      );
    }),
  );
});
