/**
 * @packageDocumentation
 * @module Boolean
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { createLuhnModulus, reverseLuhnNumbers } from '../utils/luhn-check.utils';

/**
 * Returns an Observable that emits a boolean value.  The source should emit a number or string that can be checked
 * with the {@link https://en.wikipedia.org/wiki/Luhn_algorithm|Luhn Algorithm} used to validate identification numbers
 * such as bank cards and IMEI numbers.
 *
 * @category Boolean Validation
 *
 * @example
 * Returns if the value passes the Luhn check.
 * ```ts
 * const input = ['4485275742308327', '1111222233334444', '111133332224444'];
 * from(input).pipe(luhnCheck()).subscribe();
 *```
 * Output: `[true, true, false]`
 *
 * @returns Observable that emits an boolean if the source value passes the Luhn check
 */
export function luhnCheck<T extends string | number>(): OperatorFunction<T, boolean> {
  return (source: Observable<T>) =>
    source.pipe(
      map(reverseLuhnNumbers),
      map(createLuhnModulus),
      map((value) => value % 10 === 0),
    );
}
