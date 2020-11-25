/**
 * @packageDocumentation
 * @module Boolean
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { createLuhnModulus, reverseLuhnNumbers } from '../utils/luhn-check.utils';

/**
 * The `luhnCheck` operator is used to validate identification numbers such as bank cards,
 * IMEI numbers using the [Luhn Algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm)
 *
 * @example
 * fromString('4485275742308327')
 *  .pipe(luhnCheck())
 *  subscribe(); // true
 *
 *  @returns Boolean value if the passed value passes the Luhn check
 * @category RxJS Boolean Validation
 */
export function luhnCheck(): OperatorFunction<string | number, boolean> {
  return (source: Observable<string | number>) =>
    source.pipe(
      map(reverseLuhnNumbers),
      map(createLuhnModulus),
      map((value) => value % 10 === 0),
    );
}
