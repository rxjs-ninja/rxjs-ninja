/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits a boolean value if the source Observable Array or Set is a superset of
 * the input Array or Set
 *
 * @category Query
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
export function isSupersetOf<T extends unknown>(
  input: Subscribable<Iterable<T>> | Iterable<T>,
): OperatorFunction<Iterable<T>, boolean> {
  const input$ = createOrReturnObservable(input);
  return (source) =>
    source.pipe(
      withLatestFrom(input$),
      map(([value, inputValue]) => [new Set(value), new Set(inputValue)]),
      map(([value, inputValue]) => [...inputValue].filter((e) => [...value].includes(e)).length === inputValue.size),
    );
}
