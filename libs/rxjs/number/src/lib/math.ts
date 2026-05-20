/**
 * @packageDocumentation
 * @module Number
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';
import { mathUnary } from '../utils/math-unary';

/** `Math.abs` */
export function abs(): OperatorFunction<number, number> {
  return mathUnary(Math.abs);
}

/** `Math.sign` */
export function sign(): OperatorFunction<number, number> {
  return mathUnary(Math.sign);
}

/** `Math.floor` */
export function floor(): OperatorFunction<number, number> {
  return mathUnary(Math.floor);
}

/** `Math.ceil` */
export function ceil(): OperatorFunction<number, number> {
  return mathUnary(Math.ceil);
}

/** `Math.trunc` */
export function trunc(): OperatorFunction<number, number> {
  return mathUnary(Math.trunc);
}

/** `Math.sqrt` */
export function sqrt(): OperatorFunction<number, number> {
  return mathUnary(Math.sqrt);
}

/** `Math.cbrt` */
export function cbrt(): OperatorFunction<number, number> {
  return mathUnary(Math.cbrt);
}

/** `Math.sin` */
export function sin(): OperatorFunction<number, number> {
  return mathUnary(Math.sin);
}

/** `Math.cos` */
export function cos(): OperatorFunction<number, number> {
  return mathUnary(Math.cos);
}

/** `Math.tan` */
export function tan(): OperatorFunction<number, number> {
  return mathUnary(Math.tan);
}

/** `Math.asin` */
export function asin(): OperatorFunction<number, number> {
  return mathUnary(Math.asin);
}

/** `Math.acos` */
export function acos(): OperatorFunction<number, number> {
  return mathUnary(Math.acos);
}

/** `Math.atan` */
export function atan(): OperatorFunction<number, number> {
  return mathUnary(Math.atan);
}

/** `Math.sinh` */
export function sinh(): OperatorFunction<number, number> {
  return mathUnary(Math.sinh);
}

/** `Math.cosh` */
export function cosh(): OperatorFunction<number, number> {
  return mathUnary(Math.cosh);
}

/** `Math.tanh` */
export function tanh(): OperatorFunction<number, number> {
  return mathUnary(Math.tanh);
}

/** `Math.exp` */
export function exp(): OperatorFunction<number, number> {
  return mathUnary(Math.exp);
}

/** `Math.log` */
export function log(): OperatorFunction<number, number> {
  return mathUnary(Math.log);
}

/** `Math.log10` */
export function log10(): OperatorFunction<number, number> {
  return mathUnary(Math.log10);
}

/** `Math.log2` */
export function log2(): OperatorFunction<number, number> {
  return mathUnary(Math.log2);
}

/**
 * `Math.atan2` with a fixed y value from the source and x from the parameter.
 *
 * @param x The x argument to `Math.atan2`
 */
export function atan2(x: Subscribable<number> | number): OperatorFunction<number, number> {
  const x$ = createOrReturnObservable(x);
  return (source) =>
    source.pipe(
      withLatestFrom(x$),
      map(([y, xValue]) => Math.atan2(y, xValue)),
    );
}

/**
 * `Math.hypot` with additional legs passed as parameters (source is the first leg).
 *
 * @param values Additional legs to pass to `Math.hypot`
 */
export function hypot(...values: (Subscribable<number> | number)[]): OperatorFunction<number, number> {
  const value$ = values.map((value) => createOrReturnObservable(value));
  return (source) =>
    source.pipe(
      withLatestFrom(...value$),
      map(([first, ...rest]) => Math.hypot(first, ...rest)),
    );
}
