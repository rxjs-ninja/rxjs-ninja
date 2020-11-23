import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `join` operator takes an array from an observable source and returns a string on the joined
 * array values.
 *
 * @param separator The separator to pass for strings, by default a space
 *
 * @example
 * ```ts
 * of(['Hello', 'RxJS', 'Ninja'])
 * .pipe(join())
 * .subscribe() // 'Hello RxJS Ninja'
 * ```
 *
 * @example
 * ```ts
 * of(['Name', 'Age', 'Location'])
 * .pipe(join(','))
 * .subscribe() // 'Name,Age,Location'
 * ```
 *
 * @returns String of the array values joined by the separator
 * @category RxJS Array Modify
 */
export function join<T extends unknown>(separator = ' '): OperatorFunction<T[], string> {
  return (source: Observable<T[]>) => source.pipe(map((value) => value.join(separator)));
}
