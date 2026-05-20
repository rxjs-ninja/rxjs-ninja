/**
 * The RxJS Ninja Number module contains operators for working with, and returning number values. The operators allow
 * for filtering, querying, converting to and from String, and mathematical operations.
 *
 * @packageDocumentation
 * @module Number
 */
/* istanbul ignore file */

// Arithmetic
export { add } from './lib/add';
export { div } from './lib/div';
export { mod } from './lib/mod';
export { mul } from './lib/mul';
export { pow } from './lib/pow';
export { sub } from './lib/sub';

// Constants
export {
  NUMBER_EPSILON,
  NUMBER_MAX_SAFE_INTEGER,
  NUMBER_MAX_VALUE,
  NUMBER_MIN_SAFE_INTEGER,
  NUMBER_MIN_VALUE,
  NUMBER_NAN,
  NUMBER_NEGATIVE_INFINITY,
  NUMBER_POSITIVE_INFINITY,
} from './lib/number-constants';

// Conversion
export { coerceNumber } from './lib/coerce-number';
export { parseFloat } from './lib/parse-float';
export { parseHex } from './lib/parse-hex';
export { parseInt } from './lib/parse-int';

// Distribution
export { max } from './lib/max';
export { mean } from './lib/mean';
export { median } from './lib/median';
export { min } from './lib/min';

// Filter
export { filterInRange } from './lib/filter-in-range';
export { filterIsFinite } from './lib/filter-is-finite';
export { filterIsFloat } from './lib/filter-is-float';
export { filterIsInteger } from './lib/filter-is-integer';
export { filterIsSafeInteger } from './lib/filter-is-safe-integer';
export { filterNaN } from './lib/filter-nan';
export { filterOutOfRange } from './lib/filter-out-of-range';

// Formatting
export { roundTo } from './lib/round-to';
export { toExponential } from './lib/to-exponential';
export { toFixed } from './lib/to-fixed';
export { toHex } from './lib/to-hex';
export { toLocaleString } from './lib/to-locale-string';
export { toPrecision } from './lib/to-precision';
export { toString } from './lib/to-string';

// Intl
export { intlNumberFormat, intlNumberFormatParts, intlNumberFormatRange } from './lib/intl-number-format';

// Math
export {
  abs,
  acos,
  asin,
  atan,
  atan2,
  ceil,
  cos,
  cbrt,
  cosh,
  exp,
  floor,
  hypot,
  log,
  log10,
  log2,
  sign,
  sin,
  sinh,
  sqrt,
  tan,
  tanh,
  trunc,
} from './lib/math';

// Operators
export { fromFibonacci } from './lib/from-fibonacci';
export { fromNumber } from './lib/from-number';

// Query
export { inRange } from './lib/in-range';
export { isFinite } from './lib/is-finite';
export { isFloat } from './lib/is-float';
export { isInteger } from './lib/is-integer';
export { isMod } from './lib/is-mod';
export { isNaN } from './lib/is-nan';
export { isNotNaN } from './lib/is-not-nan';
export { isSafeInteger } from './lib/is-safe-integer';
export { outOfRange } from './lib/out-of-range';
