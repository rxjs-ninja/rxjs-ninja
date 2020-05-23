/**
 * @packageDocumentation
 * @module utility
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `luhnCheck` operator is used to validate identification numbers such as bank cards,
 * IMEI numbers using the [Luhn Algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm)
 *
 * @example
 * fromString('4485275742308327')
 *  .pipe(luhnCheck())
 *  .subscribe(console.log) // true
 *
 *  @returns Boolean value if the passed value passes the Luhn check
 * @category RxJS Boolean Validation
 */
export function luhnCheck(): OperatorFunction<string | number, boolean> {
  return (source: Observable<string | number>) =>
    source.pipe(
      map((value) => {
        return (typeof value === 'number' ? value.toString(10) : value)
          .split('')
          .reverse()
          .map((val) => parseInt(val, 10));
      }),
      map((valueArray) => {
        const lastDigit = valueArray.splice(0, 1)[0];
        const sum = valueArray.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0);
        return sum + lastDigit;
      }),
      map((value) => value % 10 === 0),
    );
}
