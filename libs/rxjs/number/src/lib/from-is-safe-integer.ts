import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * This operator can be used with an Observable stream of numbers and returns the actual value
 * if a number is a safe integer. To get a boolean value if a number is a safe integer use the `isSafeInteger()` operator
 */
export function fromIsSafeInteger(): MonoTypeOperatorFunction<number> {
  return (source: Observable<number>) => source.pipe(filter((value) => Number.isSafeInteger(value)));
}
