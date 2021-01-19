/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, of, OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from 'libs/rxjs/string/src/utils/internal';

/**
 * Returns an Observable that emits a number that is the first index of where the value is found using String.search
 *
 * @category Query
 *
 * @param pattern A string or RegExp to match in the string
 *
 * @example
 * Return the first index of `Ninja`
 * ```ts
 * of('RxJS Ninja, Angular Ninja').pipe(search('Ninja')).subscribe();
 * ```
 * Output: `5`
 *
 * @example
 * Return the first index of the first found group from the RegExp
 * ```ts
 * of('RxJS Ninja, Angular Ninja').pipe(search(/(?!\w+\s)(\w+)/g)).subscribe();
 * ```
 * Output: `5`
 *
 * @returns Observable that emits an number that is the start index of the first found value
 */
export function search(pattern: Subscribable<string | RegExp> | string | RegExp): OperatorFunction<string, number> {
  const pattern$ = createOrReturnObservable(pattern);
  return (source) =>
    source.pipe(
      withLatestFrom(pattern$),
      map(([value, patternValue]) => value.search(patternValue)),
    );
}
