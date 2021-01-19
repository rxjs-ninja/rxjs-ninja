import { isObservable, Observable, of, OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a string value from an `Array` or `Set` of values converted to string
 *
 * @category Create
 *
 * @typeParam T The type of value in the source `Array` or `Map`
 *
 * @param separator The separator character to join text with, default is a space character
 *
 * @returns Observable that emits a string from an `Array` or`Set of values
 */
export function join(separator: Subscribable<string> | string = ' '): OperatorFunction<Iterable<unknown>, string> {
  const separator$ = (isObservable(separator) ? separator : of(separator)) as Observable<string>;
  return (source) =>
    source.pipe(
      withLatestFrom(separator$),
      map(([value, separatorValue]) => [...value].join(separatorValue)),
    );
}
