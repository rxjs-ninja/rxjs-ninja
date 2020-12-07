/**
 * @packageDocumentation
 * @module Array
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable string based on the source array being joined using the `separator` parameter.
 *
 * @param separator Separator to be used to join strings. Default value is a space character.
 *
 * @example
 * ```ts
 * const input = ['Hello', 'RxJS', 'Ninja'];
 * of(input).pipe(join()).subscribe();
 * // 'Hello RxJS Ninja'
 * ```
 *
 * @example
 * ```ts
 * const input = ['Name', 'Age', 'Location'];
 * of(input).pipe(join(',')).subscribe();
 * // 'Name,Age,Location'
 * ```
 *
 * @returns Observable string from the joined values in the source Observable array
 * @category Array Modify
 */
export function join<T extends unknown>(separator = ' '): OperatorFunction<T[], string> {
  return (source: Observable<T[]>) => source.pipe(map((value) => value.join(separator)));
}
