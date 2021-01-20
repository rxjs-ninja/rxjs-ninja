/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits a joining the values of the Array or Set using the `separator` character using
 * Array.join
 *
 * @category Modify
 *
 * @typeParam T Item type contained in the Array/Set
 *
 * @param separator Separator to be used to join strings. Default value is a space (` `) character.
 *
 * @example
 * Returns a string of an array joined with spaces
 * ```ts
 * const input = ['Hello', 'RxJS', 'Ninja'];
 * of(input).pipe(join()).subscribe();
 * ```
 * Output: `'Hello RxJS Ninja'`
 *
 * @example
 * Returns a string of an array joined with a comma and space
 * ```ts
 * const input = ['Name', 'Age', 'Location'];
 * of(input).pipe(join(', ')).subscribe();
 * ```
 * Output: `'Name, Age, Location'`
 *
 * @returns Observable string from the joined values in the source array
 */
export function join<T extends unknown>(separator: Subscribable<string> | string = ' '): OperatorFunction<Iterable<T>, string> {
  const separator$ = createOrReturnObservable(separator);
  return (source) =>
    source.pipe(
      withLatestFrom(separator$),
      map(([value, separatorValue]) => [...value].join(separatorValue)),
    );
}
