import { PredicateFn } from '../types/boolean';
import { Observable, of, OperatorFunction } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { InputModifierFn } from '../types/iif';

function ifSource<I = never, T = never, F = never>(
  predicate: PredicateFn<I>,
  trueResult: InputModifierFn<I, T>,
  falseResult: InputModifierFn<I, F>,
): OperatorFunction<I, T | F> {
  return (source: Observable<never>) =>
    source.pipe(switchMap((value: I) => (predicate(value) ? of(trueResult(value)) : of(falseResult(value)))));
}

export { ifSource };
