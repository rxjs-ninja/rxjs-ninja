/**
 * @packageDocumentation
 * @module array
 */
import { MonoTypeOperatorFunction, Observable, ObservableInput } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MutateValueFn } from '../types/intersect';
import { mapIntersection } from '../utils/intersects';

/**
 * The `intersects` operator is used with ab Observable array of items, which is compared against an array of items
 * passed as the first parameter. An optional method can be passed to mutate the items for comparison
 * @param input
 * @param mutate
 */
function intersects<T, K>(input: T[] | ObservableInput<T[]>, mutate?: MutateValueFn<T, T | K>): MonoTypeOperatorFunction<T[]>;
function intersects<T, K>(input: T[] | ObservableInput<T[]>, mutate?: MutateValueFn<T, T | K>): MonoTypeOperatorFunction<T[]>;
function intersects<T, K>(input: T[] | ObservableInput<T[]>, mutate?: MutateValueFn<T, T | K>): MonoTypeOperatorFunction<T[]> {
  return (source: Observable<T[]>) => {
    if (Array.isArray(input)) {
      return source.pipe(map(mapIntersection(input, mutate)));
    } else if (input instanceof Observable) {
      return input.pipe(switchMap((value) => source.pipe(map(mapIntersection(value, mutate)))));
    }
  };
}

export { intersects };
