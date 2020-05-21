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
 * @param input
 * @param mutate
 */
export function intersects<T, K>(input: T[] | ObservableInput<T[]>, mutate?: MutateValueFn<T, T | K>): MonoTypeOperatorFunction<T[]> {
  return (source: Observable<T[]>) => {
    if (Array.isArray(input)) {
      return source.pipe(map(mapIntersection(input, mutate)));
    } else if (input instanceof Observable) {
      return input.pipe(switchMap((input) => source.pipe(map(mapIntersection(input, mutate)))));
    }
  };
}
