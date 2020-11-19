import { MonoTypeOperatorFunction, Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { InputModifierFn, SortFn } from '../types/search';

// eslint-disable-next-line
function defaultSortFn(a: any, b: any): number {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

// eslint-disable-next-line
export function sortMap<T extends any, K extends any>(
  mapFn: InputModifierFn<T, K>,
  fn?: SortFn,
): OperatorFunction<T[], K[]> {
  const sortFn = fn || defaultSortFn;
  return (source: Observable<T[]>) =>
    source.pipe(
      map((arr) => arr.sort((a, b) => sortFn(a, b))),
      map((arr) => arr.map(mapFn)),
    );
}
