import { marbles } from 'rxjs-marbles/jest';
import { Lengths } from '../types/length';
import { length } from './length';

describe('length', () => {
  // Centimeters
  describe('cm', () => {
    it(
      'should return to precision 2',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100.1234,
          c: 420.5689,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 100.12,
          c: 420.57,
        });
        m.expect(input.pipe(length(Lengths.CENTIMETERS, Lengths.CENTIMETERS, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert cm to feet',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 3.281,
          c: 13.779,
        });
        m.expect(input.pipe(length(Lengths.CENTIMETERS, Lengths.FEET))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
    it(
      'should convert cm to inches',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 39.37,
          c: 165.354,
        });
        m.expect(input.pipe(length(Lengths.CENTIMETERS, Lengths.INCHES))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert cm to km',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 0.001,
          c: 0.004,
        });
        m.expect(input.pipe(length(Lengths.CENTIMETERS, Lengths.KILOMETERS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert cm to meters',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 1,
          c: 4.2,
        });
        m.expect(input.pipe(length(Lengths.CENTIMETERS, Lengths.METERS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert cm to miles with precision of 4',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 0.0006,
          c: 0.0026,
        });
        m.expect(input.pipe(length(Lengths.CENTIMETERS, Lengths.MILES, 4))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert cm to yards to precision of 2',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 1.09,
          c: 4.59,
        });
        m.expect(input.pipe(length(Lengths.CENTIMETERS, Lengths.YARDS, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  // Feet
  describe('feet', () => {
    it(
      'should return to precision 2',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100.1234,
          c: 420.5689,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 100.12,
          c: 420.57,
        });
        m.expect(input.pipe(length(Lengths.FEET, Lengths.FEET, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to cm',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 3048.037,
          c: 12801.756,
        });
        m.expect(input.pipe(length(Lengths.FEET, Lengths.CENTIMETERS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
    it(
      'should convert to inches',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 1200,
          c: 5040,
        });
        m.expect(input.pipe(length(Lengths.FEET, Lengths.INCHES))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to km',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 0.03,
          c: 0.128,
        });
        m.expect(input.pipe(length(Lengths.FEET, Lengths.KILOMETERS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to meters',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 30.48,
          c: 128.018,
        });
        m.expect(input.pipe(length(Lengths.FEET, Lengths.METERS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to miles',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 0.0189,
          c: 0.0795,
        });
        m.expect(input.pipe(length(Lengths.FEET, Lengths.MILES, 4))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to yards',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 33.333,
          c: 139.999,
        });
        m.expect(input.pipe(length(Lengths.FEET, Lengths.YARDS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  // Inches
  describe('inches', () => {
    it(
      'should return to precision 2',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100.1234,
          c: 420.5689,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 100.12,
          c: 420.57,
        });
        m.expect(input.pipe(length(Lengths.INCHES, Lengths.INCHES, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to cm with precision of `1`',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 254,
          c: 1066.8,
        });
        m.expect(input.pipe(length(Lengths.INCHES, Lengths.CENTIMETERS, 1))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
    it(
      'should convert to feet',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 8.333,
          c: 35,
        });
        m.expect(input.pipe(length(Lengths.INCHES, Lengths.FEET))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to km',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 0.003,
          c: 0.011,
        });
        m.expect(input.pipe(length(Lengths.INCHES, Lengths.KILOMETERS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to meters',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 2.54,
          c: 10.668,
        });
        m.expect(input.pipe(length(Lengths.INCHES, Lengths.METERS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to miles',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 0.002,
          c: 0.007,
        });
        m.expect(input.pipe(length(Lengths.INCHES, Lengths.MILES))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to yards',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 2.78,
          c: 11.67,
        });
        m.expect(input.pipe(length(Lengths.INCHES, Lengths.YARDS, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  // Kilometers
  describe('km', () => {
    it(
      'should return to precision 2',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100.1234,
          c: 420.5689,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 100.12,
          c: 420.57,
        });
        m.expect(input.pipe(length(Lengths.KILOMETERS, Lengths.KILOMETERS, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to cm',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 10000000,
          c: 42000000,
        });
        m.expect(input.pipe(length(Lengths.KILOMETERS, Lengths.CENTIMETERS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
    it(
      'should convert to feet',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 328080,
          c: 1377936,
        });
        m.expect(input.pipe(length(Lengths.KILOMETERS, Lengths.FEET))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to inches',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 3937000,
          c: 16535400,
        });
        m.expect(input.pipe(length(Lengths.KILOMETERS, Lengths.INCHES))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to meters',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 100000,
          c: 420000,
        });
        m.expect(input.pipe(length(Lengths.KILOMETERS, Lengths.METERS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to miles',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 62.137,
          c: 260.975,
        });
        m.expect(input.pipe(length(Lengths.KILOMETERS, Lengths.MILES))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to yards',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 109360,
          c: 459312,
        });
        m.expect(input.pipe(length(Lengths.KILOMETERS, Lengths.YARDS, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  // Meters
  describe('meters', () => {
    it(
      'should return to precision 2',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100.1234,
          c: 420.5689,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 100.12,
          c: 420.57,
        });
        m.expect(input.pipe(length(Lengths.METERS, Lengths.METERS, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to cm',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 10000,
          c: 42000,
        });
        m.expect(input.pipe(length(Lengths.METERS, Lengths.CENTIMETERS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
    it(
      'should convert to feet',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 328.08,
          c: 1377.936,
        });
        m.expect(input.pipe(length(Lengths.METERS, Lengths.FEET))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to km',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 3937,
          c: 16535.4,
        });
        m.expect(input.pipe(length(Lengths.METERS, Lengths.INCHES))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to km',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 0.1,
          c: 0.42,
        });
        m.expect(input.pipe(length(Lengths.METERS, Lengths.KILOMETERS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to miles',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 0.062,
          c: 0.261,
        });
        m.expect(input.pipe(length(Lengths.METERS, Lengths.MILES))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to yards',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 109.36,
          c: 459.31,
        });
        m.expect(input.pipe(length(Lengths.METERS, Lengths.YARDS, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  // Miles
  describe('miles', () => {
    it(
      'should return to precision 2',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100.1234,
          c: 420.5689,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 100.12,
          c: 420.57,
        });
        m.expect(input.pipe(length(Lengths.MILES, Lengths.MILES, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to cm to precision 0',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 16093471,
          c: 67592578,
        });
        m.expect(input.pipe(length(Lengths.MILES, Lengths.CENTIMETERS, 0))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
    it(
      'should convert to feet',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 528000,
          c: 2217600,
        });
        m.expect(input.pipe(length(Lengths.MILES, Lengths.FEET))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to km',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 6336000,
          c: 26611200,
        });
        m.expect(input.pipe(length(Lengths.MILES, Lengths.INCHES))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to km',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 160.935,
          c: 675.926,
        });
        m.expect(input.pipe(length(Lengths.MILES, Lengths.KILOMETERS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to meters',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 160934.709,
          c: 675925.777,
        });
        m.expect(input.pipe(length(Lengths.MILES, Lengths.METERS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to yards',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 176000,
          c: 739200,
        });
        m.expect(input.pipe(length(Lengths.MILES, Lengths.YARDS, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  // Yards
  describe('yards', () => {
    it(
      'should return to precision 2',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100.1234,
          c: 420.5689,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 100.12,
          c: 420.57,
        });
        m.expect(input.pipe(length(Lengths.YARDS, Lengths.YARDS, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to cm',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 9144.111,
          c: 38405.267,
        });
        m.expect(input.pipe(length(Lengths.YARDS, Lengths.CENTIMETERS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
    it(
      'should convert to feet',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 300,
          c: 1260,
        });
        m.expect(input.pipe(length(Lengths.YARDS, Lengths.FEET))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to km',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 3600,
          c: 15120,
        });
        m.expect(input.pipe(length(Lengths.YARDS, Lengths.INCHES))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to km',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 0.091,
          c: 0.384,
        });
        m.expect(input.pipe(length(Lengths.YARDS, Lengths.KILOMETERS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to meters',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 91.441,
          c: 384.053,
        });
        m.expect(input.pipe(length(Lengths.YARDS, Lengths.METERS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to miles',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 0.06,
          c: 0.24,
        });
        m.expect(input.pipe(length(Lengths.YARDS, Lengths.MILES, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });
});
