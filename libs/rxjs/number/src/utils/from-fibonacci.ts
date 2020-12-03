/**
 * @packageDocumentation
 * @module Number
 */

/**
 * Get the fibonacci number
 * @private
 * @internal
 * @param n
 * @param memo
 */
export function fibonacci(n: number, memo: Record<number, number>): number {
  return memo[n] || (n <= 2 ? 1 : (memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)));
}
