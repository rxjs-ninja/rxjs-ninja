import { getRandomValues } from '@trust/webcrypto';

import { observe } from 'rxjs-marbles/jest';
import { take, tap } from 'rxjs/operators';
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
});
