/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a boolean value if the source Observable Array or Set is a subset of
 * the input Array or Set
 *
 * @remarks The source set (A) is subset of the input set (B) when B contains all elements of A (`A ⊆ B`)
 *
 * @typeDef T The type contained in the Array or Set
 *
 * @param input The Array or Set to check if the value is a subset of it
 *
 * @example Return if the source array is a subset of the input array
 * ```ts
 * const input = [ ['a', 'c'], b: ['a', 'e'], c: ['x', 'z'] ]
 * from(input).pipe(isSubsetOf(['a', 'b', 'c'])).subscribe()
 * ```
 * Output: `true, false, false`
 *
 * @returns Observable that emits a boolean of the source array being a subset of the input array
 */
export function isSubsetOf<T extends unknown>(input: T[] | Set<T>): OperatorFunction<T[] | Set<T>, boolean> {
  return (source) =>
    source.pipe(
      map((value) => [new Set(input), new Set(value)]),
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
