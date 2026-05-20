/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable object merged with `Object.assign` (does not mutate the source object).
 *
 * @category Object
 *
 * @typeParam T Target object type
 *
 * @param sources One or more source objects (or Observables) to copy enumerable properties from
 *
 * @returns An Observable that emits the merged object
 */
export function objectAssign<T extends object>(
  ...sources: (Subscribable<Partial<T>> | Partial<T>)[]
): OperatorFunction<T, T> {
  const source$ = sources.map((source) => createOrReturnObservable(source));
  return (input) =>
    input.pipe(
      withLatestFrom(...source$),
      map(([target, ...assignSources]) => Object.assign({}, target, ...assignSources) as T),
    );
}
