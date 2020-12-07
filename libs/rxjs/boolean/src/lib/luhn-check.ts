/**
 * @packageDocumentation
 * @module Boolean
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { createLuhnModulus, reverseLuhnNumbers } from '../utils/luhn-check.utils';

/**
 * Returns an Observable that emits a boolean if the source Observable emits a number or string that can be checked
 * with the [Luhn Algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) - used to  validate identification numbers
 * such as bank cards and IMEI numbers.
 *
 * @example
 * ```ts
 * const input = ['4485275742308327', '1111222233334444', '111133332224444'];
 * from(input).pipe(luhnCheck()).subscribe();
 * // [true, true, false]
 *```
 *
 * @returns Observable that emits an boolean if the source Observable value passes the Luhn check
 * @category Boolean Validation
 */
export function luhnCheck<T extends string | number>(): OperatorFunction<T, boolean> {
  return (source: Observable<T>) =>
    source.pipe(
      map(reverseLuhnNumbers),
      map(createLuhnModulus),
      map((value) => value % 10 === 0),
    );
}
