import { firstValueFrom } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { fromFetchWithProgress } from '../../libs/rxjs/utility/src/lib/from-fetch-with-progress';

const pieces = [0, 25, 50, 75, 100];

function createFetch(ok: boolean, body: unknown) {
  return () =>
    Promise.resolve({
      ok,
      headers: { get: () => 5 },
      body,
      status: ok ? 200 : 500,
      statusText: ok ? 'ok' : 'Unknown Error',
    });
}

export async function fetchWithProgress(): Promise<{ percents: number[]; isUint8Array: boolean }> {
  const addedPercent: number[] = [];
  let finalResult: Uint8Array | undefined;

  window.fetch = createFetch(true, {
    getReader() {
      let i = 0;
      return {
        read() {
          return Promise.resolve(
            i < pieces.length
              ? { value: new Uint8Array([pieces[i++]]), done: false }
              : { value: undefined, done: true },
          );
        },
      };
    },
  }) as typeof fetch;

  await new Promise<void>((resolve, reject) => {
    fromFetchWithProgress('http://example.com/foo.jpg')
      .pipe(
        tap((value) => {
          if (typeof value === 'number') {
            addedPercent.push(value);
          } else {
            finalResult = value;
          }
        }),
      )
      .subscribe({ complete: resolve, error: reject });
  });

  return {
    percents: addedPercent,
    isUint8Array: finalResult instanceof Uint8Array,
  };
}

export async function emptyBodyError(): Promise<string> {
  window.fetch = createFetch(true, undefined) as typeof fetch;

  return firstValueFrom(
    fromFetchWithProgress('http://example.com/foo.jpg').pipe(catchError((error: Error) => of(error.message))),
  );
}

export async function notOkError(): Promise<string> {
  window.fetch = createFetch(false, {}) as typeof fetch;

  return firstValueFrom(
    fromFetchWithProgress('http://example.com/foo.jpg').pipe(catchError((error: Error) => of(error.message))),
  );
}
