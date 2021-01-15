/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a boolean value if the source Observable Array or Set has equal non-duplicate
 * content of the input Array or Set
 *
 * @category Query
 *
 * @remarks The source set (A) is equal in content to the input set (B) (`A == B`)
 *
 * @typeParam T The input type of the source Array or Set
 *
 * @param input The Array or Set to check if the set is equal
 *
 * @example Return if the source array is a subset of the input array
 * ```ts
 * const input = [ ['a', 'b', 'c'],  ['a', 'c', 'b', 'a'], ['a', 'b', 'z', 'x' ] ];
 * from(input).pipe(isEqualSet(['a', 'b', 'c'])).subscribe()
 * ```
 * Output: `true, true, false`
 *
 * @returns Observable that emits a boolean of the source array has equal content to the input array
 */
export function isEqualSet<T extends unknown>(input: T[] | Set<T>): OperatorFunction<T[] | Set<T>, boolean> {
  return (source) =>
    source.pipe(
      map((value) => [new Set(input), new Set(value)]),
      map(([inputValue, value]) => [inputValue, value, inputValue.size == value.size] as [Set<T>, Set<T>, boolean]),
      map(([inputValue, value, sameSize]) => (sameSize ? [...value].every((e) => [...inputValue].includes(e)) : false)),
    );
}
