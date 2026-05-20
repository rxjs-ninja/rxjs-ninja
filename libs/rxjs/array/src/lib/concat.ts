/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable Array that concatenates the source Array or Set with the input Iterable using
 * Array.prototype.concat.
 *
 * @category Modify
 *
 * @typeParam T Item type contained in the Array or Set
 *
 * @param input Array, Set, or Observable Iterable to append to the source
 *
 * @example
 * Concatenates the source array with another array
 * ```ts
 * const input = ['a', 'b'];
 * of(input).pipe(concat(['c', 'd'])).subscribe();
 * ```
 * Output: `'a', 'b', 'c', 'd'`
 *
 * @returns An Observable that emits the concatenated array
 */
export function concat<T extends unknown>(
  input: Subscribable<Iterable<T>> | Iterable<T>,
): OperatorFunction<Iterable<T>, T[]> {
  const input$ = createOrReturnObservable(input);
  return (source) =>
    source.pipe(
      withLatestFrom(input$),
      map(([value, inputValue]) => [...value].concat([...inputValue])),
    );
}
