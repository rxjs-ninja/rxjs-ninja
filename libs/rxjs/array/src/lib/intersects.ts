/**
 * @packageDocumentation
 * @module array
 */
import { MonoTypeOperatorFunction, Observable, ObservableInput } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MutateValueFn } from '../types/intersect';
import { mapIntersection } from '../utils/intersects';

/**
 *
 * @param checkArray
 * @param mutate
 */
export function intersects<T, K>(checkArray: T[] | ObservableInput<T[]>, mutate?: MutateValueFn<T, T | K>): MonoTypeOperatorFunction<T[]> {
  return (source: Observable<T[]>) => {
    if (Array.isArray(checkArray)) {
      return source.pipe(map(mapIntersection(checkArray, mutate)));
    } else if (checkArray instanceof Observable) {
      return checkArray.pipe(switchMap((input) => source.pipe(map(mapIntersection(input, mutate)))));
    }
  };
}
