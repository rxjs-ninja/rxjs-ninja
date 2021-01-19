/**
 * @packageDocumentation
 * @module String
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';
import { isIterable } from 'rxjs/internal-compatibility';

/**
 * Returns an Observable that emits a number, the character code of a character at the passed position in a source
 * string using String.charCodeAt
 *
 * @category Query
 *
 * @param positions The index of the character to return in the source string
 *
 *
 * @example
 * Return the character code of the character at index `1`
 * ```ts
 * of('RxJS Ninja').pipe(charCodeAt(1)).subscribe();
 * ```
 * Output: `120`
 *
 * @returns Observable that emits a number that is a character code
 */
export function charCodeAt(
  positions: Subscribable<Iterable<number> | number> | Iterable<number> | number,
): OperatorFunction<string, number[]> {
  const position$ = createOrReturnObservable(positions);
  return (source) =>
    source.pipe(
      withLatestFrom(position$),
      map(([value, inputValue]) =>
        typeof inputValue === 'number'
          ? [value.charCodeAt(inputValue)]
          : [...inputValue].map((v) => value.charCodeAt(v)),
      ),
    );
}
