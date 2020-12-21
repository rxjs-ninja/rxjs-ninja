/**
 * @packageDocumentation
 * @module String
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number that is the first index of where the value is found using String.search
 *
 * @category String Query
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
export function search(pattern: string | RegExp): OperatorFunction<string, number> {
  return (source: Observable<string>) => source.pipe(map((value) => value.search(pattern)));
}
