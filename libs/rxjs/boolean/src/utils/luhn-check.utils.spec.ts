import { createLuhnModulus, reverseLuhnNumbers } from './luhn-check.utils';

describe('luhn utils', () => {
  it('Should generate a valid modulus 10 number', () => {
    const number = '1111222233334444';
    const numbers = reverseLuhnNumbers(number);
    const value = createLuhnModulus(numbers);

    expect(value % 10).toBe(0);
  });

  it('Should generate a number that is not modulus 10', () => {
    const number = '1111222233334445';
    const numbers = reverseLuhnNumbers(number);
    const value = createLuhnModulus(numbers);

    expect(value % 10).not.toBe(0);
  });
});
