/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable object shallow-merged with later sources using spread (similar to `Object.assign` for plain objects).
 *
 * @category Object
 *
 * @typeParam T Target object type
 *
 * @param sources Objects (or Observables) whose properties are merged after the source
 *
 * @returns An Observable that emits the merged object
 */
export function objectMerge<T extends object>(
  ...sources: (Subscribable<Partial<T>> | Partial<T>)[]
): OperatorFunction<T, T> {
  const source$ = sources.map((source) => createOrReturnObservable(source));
  return (input) =>
    input.pipe(
      withLatestFrom(...source$),
      map(([target, ...mergeSources]) => ({ ...target, ...Object.assign({}, ...mergeSources) }) as T),
    );
}
