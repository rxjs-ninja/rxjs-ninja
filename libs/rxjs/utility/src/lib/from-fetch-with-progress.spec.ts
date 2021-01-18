import { observe } from 'rxjs-marbles/jest';
import { fromFetchWithProgress } from '@rxjs-ninja/rxjs-utility';
import { finalize, tap } from 'rxjs/operators';

describe('fromFetchWithProgress', () => {
  let globalFetch: any;

  const pieces = [0, 25, 50, 75, 100];

  beforeEach(() => {
    globalFetch = window.fetch;

    window.fetch = () =>
      Promise.resolve({
        ok: true,
        headers: {
          get: () => 5,
        },
        body: {
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
        },
      }) as any;
  });

  afterEach(() => {
    window.fetch = globalFetch;
  });

  it(
    'should fetch with progress',

    observe(() => {
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
});
