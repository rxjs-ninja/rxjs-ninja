/**
 * @packageDocumentation
 * @module Array
 */
import { isObservable, Observable, ObservableInput, of, OperatorFunction } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { ArrayOrSet } from '../types/array-set';

/**
 * Returns an Observable Array containing unique values that are in both the source and provided input Array or Set
 *
 * @category Filter
 *
 * @see [[filterIntersects]] operator for an Array containing potential duplicate intersections
 *
 * @typeParam T Item type contained in the Array/Set
 *
 * @param input Array/Set or Observable value to compare against for the intersection
 *
 * @example
 * Returns the intersection between the source array and the passed static array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(intersects(['a', 'd'])).subscribe();
 * ```
 * Output: `'a', 'd'`
 *
 * @example
 * Returns the intersection between the source array and the passed Observable array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(intersects(of(['a', 'd']))).subscribe();
 * ```
 * Output: `'a', 'd'`
 *
 * @returns An Observable that emits an array of the intersection of input and source arrays.
 */
export function intersects<T extends unknown>(
  input: ArrayOrSet<T> | ObservableInput<ArrayOrSet<T>>,
): OperatorFunction<ArrayOrSet<T>, T[]> {
  return (source) =>
    source.pipe(
      withLatestFrom((isObservable(input) ? input : of(input)) as Observable<ArrayOrSet<T>>),
      map(([value, inputValue]) => [new Set(value), new Set(inputValue)]),
      map(([value, inputValue]) => [...value].filter((x) => inputValue.has(x))),
    );
}
