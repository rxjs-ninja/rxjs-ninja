/**
 * @packageDocumentation
 * @module number
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * The `filterIsSafeInteger` operator can be used with an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable}
 * subscription numbers and returns the value based on it passing a truthy value of
 * [Number.isSafeInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger)
 *
 * @remarks
 * If you just want to check if a number is in the same integer range use the [[isSafeInteger]] operator instead
 *
 * @example
 * ```ts
 * from([1, 2, Math.pow(2, 53), Math.pow(2, 53) - 1]).pipe(filterIsSafeInteger(), reduce((acc, val) => {
 *   acc.push(val);
 *   return acc;
 * }, [])).subscribe(...) // [1, 2, 9007199254740991]
 * ```
 *
 * @returns The number value that passes the `Number.isSafeInteger` equality check
 * @category RxJS Number Filter
 */
export function filterIsSafeInteger(): MonoTypeOperatorFunction<number> {
  return (source: Observable<number>) => source.pipe(filter((value) => Number.isSafeInteger(value)));
}
