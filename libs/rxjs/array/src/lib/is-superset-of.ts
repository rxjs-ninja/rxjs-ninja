/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a boolean value if the source Observable Array or Set is a superset of
 * the input Array or Set
 *
 * @remarks The source set (A) is superset of the input set (B) when A contains all elements of B. (`A ⊇ B`)
 *
 * @typeParam T The input type of the source Array or Set
 *
 * @param input The Array or Set to check if the value is a subset of it
 *
 * @example Return if the source array is a subset of the input array
 * ```ts
 * const input = [ ['a', 'b', 'c'], b: ['a', 'b', 'e'], c: ['x', 'y', 'z'] ]
 * from(input).pipe(isSupersetOf(['a', 'c'])).subscribe()
 * ```
 * Output: `true, false, false`
 *
 * @returns Observable that emits a boolean of the source array being a superset of the input array
 */
export function isSupersetOf<T extends unknown>(input: T[] | Set<T>): OperatorFunction<T[] | Set<T>, boolean> {
  return (source) =>
    source.pipe(
      map((value) => [new Set(value), new Set(input)]),
      map(([value, set]) => {
        for (const elem of set) {
          if (!value.has(elem)) {
            return false;
          }
        }
        return true;
      }),
    );
}
