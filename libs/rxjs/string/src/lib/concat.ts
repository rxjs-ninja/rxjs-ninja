/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a string that is the source string concatenated with the passed input to the
 * operator using Sting.concat
 *
 * @category String Modify
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
export function concat<T extends string | string[] | Observable<string | string[]>>(
  ...args: T[]
): MonoTypeOperatorFunction<string> {
  const values: unknown[] = [...args];
  if (values[0] instanceof Array) {
    return (source: Observable<string>) => source.pipe(map((value) => value.concat(...(values[0] as string[]))));
  } else if (isObservable(values[0])) {
    return (source: Observable<string>) =>
      (values[0] as Observable<string[]>).pipe(
        concatMap((strings: string[]) => source.pipe(map((value) => value.concat(...strings)))),
      );
  } else {
    return (source: Observable<string>) => source.pipe(map((value) => value.concat(...(values as string[]))));
  }
}
