/**
 * @packageDocumentation
 * @module array
 */
import { MonoTypeOperatorFunction, Observable, ObservableInput } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PredicateFn } from '../types/array-compare';
import { mapIntersectsWith } from '../utils/intersects';

/**
 * The `intersectsWith` operator takes a Observable source that is an array of values, and a passed value which is
 * an array or Observable array of values of the same type.
 *
 * An optional predicate method can be passed for more complex types, but if none is passed a simple comparison (`===`)
 * will be used to determine the intersection
 *
 * @param input
 * @param predicate
 */
export function intersectsWith<T>(input: T[] | ObservableInput<T[]>, predicate?: PredicateFn<T>): MonoTypeOperatorFunction<T[]> {
  return (source: Observable<T[]>) =>
    input instanceof Observable
      ? input.pipe(switchMap((input) => source.pipe(map(mapIntersectsWith(input, predicate)))))
      : source.pipe(map(mapIntersectsWith(input as T[], predicate)));
}
