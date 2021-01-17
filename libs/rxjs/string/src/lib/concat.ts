/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { ArrayOrSet } from '../types/array-set';
import { isArrayOrSet } from '../utils/array-set';

/**
 * Returns an Observable that emits a string that is the source string concatenated with the passed input to the
 * operator using Sting.concat
 *
 * @category Modify
 *
 * @param args Observable string source, array of strings or argument list of strings
 *
 * @example
 * Return a string that is a source appended with a list of strings
 * ```ts
 * of('RxJS').pipe(concat(' ', 'Ninja')).subscribe();
 * ```
 * Output: `RxJS Ninja`
 *
 * @example
 * Return a string that is a source appended with a array of strings
 * ```ts
 * of('RxJS').pipe(concat([' ', 'Ninja'])).subscribe();
 * ```
 * Output: `RxJS Ninja`
 *
 * @example
 * Return a string that is a source appended with an Observable string
 * ```ts
 * of('RxJS').pipe(concat(of([' ', 'Ninja']))).subscribe();
 * ```
 * Output: `RxJS Ninja`
 *
 * @returns Observable that emits a string
 */
export function concat(
  ...args: ObservableInput<string | string[]>[] | ArrayOrSet<string>[] | string[]
): MonoTypeOperatorFunction<string> {
  const values: unknown[] = [...args];
  if (isArrayOrSet(values[0])) {
    return (source) => source.pipe(map((value) => value.concat(...(values[0] as string[]))));
  } else if (isObservable(values[0])) {
    return (source) =>
      source.pipe(
        withLatestFrom(values[0] as Observable<string | string[]>),
        map(([value, inputValue]) =>
          isArrayOrSet(inputValue) ? value.concat(...inputValue) : value.concat(inputValue),
        ),
      );
  } else {
    return (source: Observable<string>) => source.pipe(map((value) => value.concat(...(values as string[]))));
  }
}
