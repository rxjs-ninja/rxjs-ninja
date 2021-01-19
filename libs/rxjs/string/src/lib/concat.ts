/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits a string that is the source string concatenated with the passed input to the
 * operator using Sting.concat
 *
 * @category Modify
 *
 * @param input Single or list of arguments to concatenate with the source string
 *
 * @example
 * Return a string that is a source appended with a string
 * ```ts
 * of('RxJS').pipe(concat('Ninja')).subscribe();
 * ```
 * Output: `RxJSNinja`
 *
 * @example
 * Return a string that is a source appended with a array of strings
 * ```ts
 * of('RxJS').pipe(concat([' ', 'Ninja'])).subscribe();
 * ```
 * Output: `RxJS Ninja`
 *
 * @example
 * Return a string that is a source appended with an Observable strings
 * ```ts
 * of('RxJS').pipe(concat(of([' ', 'Ninja']))).subscribe();
 * ```
 * Output: `RxJS Ninja`
 *
 * @returns Observable that emits a string
 */
export function concat(
  input: Subscribable<Iterable<string> | string> | Iterable<string> | string,
): MonoTypeOperatorFunction<string> {
  const input$ = createOrReturnObservable(input);
  return (source) =>
    source.pipe(
      withLatestFrom(input$),
      map(([value, inputValue]) =>
        typeof inputValue === 'string' ? value.concat(inputValue) : value.concat(...inputValue),
      ),
    );
}
