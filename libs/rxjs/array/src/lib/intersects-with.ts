import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PredicateFn } from '../types/intersect';

export function intersectsWith<T>(intersection: T[], predicate?: PredicateFn<T>): MonoTypeOperatorFunction<T[]> {
  return (source: Observable<T[]>) =>
    source.pipe(
      map((value) =>
        value.filter(
          (sourceValue) =>
            intersection.findIndex((checkValue) => (predicate ? predicate(sourceValue, checkValue) : sourceValue === checkValue)) !== -1,
        ),
      ),
    );
}
