/**
 * @packageDocumentation
 * @module number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `parseFloat` operator can be used with an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable}
 * subscription string and returns a parsed float number using
 * [Number.parseFloat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat)
 *
 *
 * @example
 * ```ts
 * from(['1', '2.8', '3.14']).pipe(parseFloat(), reduce((acc, val) => {
 *   acc.push(val);
 *   return acc;
 * }, [])).subscribe(...) // [1, 2.8, 3.14]
 * ```
 *
 * @returns Float number from source string {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable}
 * @category RxJS Number Parsing
 */
export function parseFloat(): OperatorFunction<string, number> {
  return (source: Observable<string>) => source.pipe(map((value) => Number.parseFloat(value)));
}
