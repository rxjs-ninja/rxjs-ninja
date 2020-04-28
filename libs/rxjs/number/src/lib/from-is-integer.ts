import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export function fromIsInteger(): MonoTypeOperatorFunction<number> {
  return (source: Observable<number>) => source.pipe(filter(value => Number.isInteger(value)));
}
