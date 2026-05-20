import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * @private
 * @internal
 */
export function mathUnary(fn: (value: number) => number): OperatorFunction<number, number> {
  return (source) => source.pipe(map((value) => fn(value)));
}
