/**
 * @packageDocumentation
 * @module array
 */
import { MonoTypeOperatorFunction, Observable, ObservableInput } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PredicateFn } from '../types/intersect';
import { mapDifferenceWith } from '../utils/difference';

/**
 * The `intersectsWith` operator takes a Observable source that is an array of values, and a passed value which is
 * an array or Observable array of values of the same type.
 *
 * An optional predicate method can be passed for more complex types, but if none is passed a simple comparison (`===`)
 * will be used to determine the intersection
 *
 * @param intersection
 * @param predicate
 */
export function differenceWith<T>(intersection: T[] | ObservableInput<T[]>, predicate?: PredicateFn<T>): MonoTypeOperatorFunction<T[]> {
  return (source: Observable<T[]>) => {
    if (Array.isArray(intersection)) {
      return source.pipe(map(mapDifferenceWith(intersection, predicate)));
    } else if (intersection instanceof Observable) {
      return intersection.pipe(switchMap((input) => source.pipe(map(mapDifferenceWith(input, predicate)))));
    }
  };
}
