import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * The `fromIsFinite` operator can be used with an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable}
 * value or stream of numbers and returns the value based on it passing
 */
export function fromIsFinite(): MonoTypeOperatorFunction<number> {
  return (source: Observable<number>) => source.pipe(filter((value) => Number.isFinite(value)));
}
