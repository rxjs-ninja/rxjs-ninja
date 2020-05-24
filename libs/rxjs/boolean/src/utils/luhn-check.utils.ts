export function reverseLuhnNumbers(value: number | string): number[] {
  return (typeof value === 'number' ? value.toString(10) : value)
    .split('')
    .reverse()
    .map((val) => parseInt(val, 10));
}

/**
 * Generate a moulus check number from input
 * @param valueArray
 */
export function createLuhnModulus(valueArray: number[]): number {
  const lastDigit = valueArray.splice(0, 1)[0];
  const sum = valueArray.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0);
  return sum + lastDigit;
}
