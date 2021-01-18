import { getRandomValues } from '@trust/webcrypto';

import { observe } from 'rxjs-marbles/jest';
import { reduce, take, tap } from 'rxjs/operators';
import { fromUUIDv4 } from '@rxjs-ninja/rxjs-random';

describe('fromUUIDv4', () => {
  beforeAll(() => {
    (window as any)['crypto'] = window.crypto || { getRandomValues };
  });

  it(
    'should generate a valid UUID',
    observe(() =>
      fromUUIDv4().pipe(
        take(1),
        tap((value) => expect(value.length).toBe(36)),
      ),
    ),
  );

  it(
    'should optionally generate a valid UUID every 1 second',
    observe(() => {
      const start = Date.now();
      return fromUUIDv4(1000).pipe(
        take(3),
        reduce((a, b) => a + b),
        tap(() => {
          const end = Date.now();
          expect(end - start).toBeCloseTo(2000, -2);
        }),
      );
    }),
  );
});
