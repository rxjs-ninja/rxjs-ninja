/**
 * @packageDocumentation
 * @module number
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * The `filterIsFinite` operator can be used with an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable}
 * subscription numbers and returns the value based on it passing a truthy value of
 * [Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite)
 *
 * @remarks
 * If you just want to check if a number is within a finite range you can use the [[isFinite]] operator instead
 *
 * @example
 * ```ts
 * from([1, 2, Infinity]).pipe(filterIsFinite(), reduce((acc, val) => {
 *   acc.push(val);
 *   return acc;
 * }, [])).subscribe(...) // [1, 2]
 * ```
 *
 * @returns The number value that passes the `Number.isFinite` equality check
 * @category RxJS Filter Number Equality
 */
export function filterIsFinite(): MonoTypeOperatorFunction<number> {
  return (source: Observable<number>) => source.pipe(filter((value) => Number.isFinite(value)));
}
