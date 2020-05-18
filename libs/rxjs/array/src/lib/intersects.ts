import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MutateValueFn } from '../../../boolean/src/types/intersect';

export function intersects<T, K>(checkArray: T[], mutate?: MutateValueFn<T, T | K>): MonoTypeOperatorFunction<T[]> {
  if (mutate) {
    const checkSet = new Set(checkArray.map<T | K>(mutate));
    return (source: Observable<T[]>) => source.pipe(map((value) => [...new Set(value)].filter((x) => checkSet.has(mutate(x)))));
  } else {
    const checkSet = new Set(checkArray);
    return (source: Observable<T[]>) => source.pipe(map((value) => [...new Set(value)].filter((x) => checkSet.has(x))));
  }
}
