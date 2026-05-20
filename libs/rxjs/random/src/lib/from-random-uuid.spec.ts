import { observe } from 'rxjs-marbles/jest';
import { reduce, take, tap } from 'rxjs/operators';
const hasRandomUUID = typeof globalThis.crypto?.randomUUID === 'function';
import { fromRandomUUID } from './from-random-uuid';

describe('fromRandomUUID', () => {
  (hasRandomUUID ? it : it.skip)(
    'should emit RFC 4122 UUID strings',
    observe(() =>
      fromRandomUUID().pipe(
        take(2),
        tap((value) => {
          expect(value).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
          );
        }),
      ),
    ),
  );
});