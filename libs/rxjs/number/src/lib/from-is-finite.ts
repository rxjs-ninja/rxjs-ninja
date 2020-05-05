import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * This operator can be used with an Observable stream of numbers and returns the actual value
 * if a number is finite. To get a boolean value if a number is finite use the `isFinite()` operator
 */
export function fromIsFinite(): MonoTypeOperatorFunction<number> {
  return (source: Observable<number>) => source.pipe(filter((value) => Number.isFinite(value)));
}
