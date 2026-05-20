import { observe } from 'rxjs-marbles/jest';
import { reduce, take, tap } from 'rxjs/operators';
import { fromRandomBytes } from './from-random-bytes';

describe('fromRandomBytes', () => {
  it(
    'should emit buffers of the requested length',
    observe(() =>
      fromRandomBytes(8).pipe(
        take(3),
        reduce<Uint8Array, Uint8Array[]>((acc, val) => [...acc, val], []),
        tap((values) => {
          expect(values.every((v) => v instanceof Uint8Array && v.length === 8)).toBe(true);
        }),
      ),
    ),
  );
});