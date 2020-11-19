/**
 * @packageDocumentation
 * @module array
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SortFn } from '../types/search';

/**
 * Default basic sort
 * @private
 * @param a
 * @param b
 */
// eslint-disable-next-line
function defaultSortFn(a: any, b: any): number {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

// eslint-disable-next-line
export function sort<T extends any>(fn?: SortFn): MonoTypeOperatorFunction<T[]> {
  const sortFn = fn || defaultSortFn;
  return (source: Observable<T[]>) => source.pipe(map((arr) => arr.sort((a, b) => sortFn(a, b))));
}
