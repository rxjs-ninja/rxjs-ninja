import { marbles } from 'rxjs-marbles/jest';
import { distance, Distances } from '@rxjs-ninja/rxjs-utility';

describe('distance', () => {
  // Centimeters
  describe('cm', () => {
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
        m.expect(input.pipe(distance(Distances.CM, Distances.FEET))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.CM, Distances.INCHES))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.CM, Distances.KM))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.CM, Distances.METERS))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.CM, Distances.MILES, 4))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.CM, Distances.YARDS, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  // Feet
  describe('feet', () => {
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
        m.expect(input.pipe(distance(Distances.FEET, Distances.CM))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.FEET, Distances.INCHES))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.FEET, Distances.KM))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.FEET, Distances.METERS))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.FEET, Distances.MILES, 4))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.FEET, Distances.YARDS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  // Inches
  describe('inches', () => {
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
        m.expect(input.pipe(distance(Distances.INCHES, Distances.CM, 1))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.INCHES, Distances.FEET))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.INCHES, Distances.KM))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.INCHES, Distances.METERS))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.INCHES, Distances.MILES))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.INCHES, Distances.YARDS, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  // Kilometers
  describe('km', () => {
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
        m.expect(input.pipe(distance(Distances.KM, Distances.CM))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.KM, Distances.FEET))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.KM, Distances.INCHES))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.KM, Distances.METERS))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.KM, Distances.MILES))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.KM, Distances.YARDS, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  // Meters
  describe('meters', () => {
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
        m.expect(input.pipe(distance(Distances.METERS, Distances.CM))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.METERS, Distances.FEET))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.METERS, Distances.INCHES))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.METERS, Distances.KM))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.METERS, Distances.MILES))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.METERS, Distances.YARDS, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  // Miles
  describe('miles', () => {
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
        m.expect(input.pipe(distance(Distances.MILES, Distances.CM, 0))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.MILES, Distances.FEET))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.MILES, Distances.INCHES))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.MILES, Distances.KM))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.MILES, Distances.METERS))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.MILES, Distances.YARDS, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  // Miles
  describe('yards', () => {
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
        m.expect(input.pipe(distance(Distances.YARDS, Distances.CM))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.YARDS, Distances.FEET))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.YARDS, Distances.INCHES))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.YARDS, Distances.KM))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.YARDS, Distances.METERS))).toBeObservable(expected);
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
        m.expect(input.pipe(distance(Distances.YARDS, Distances.MILES, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });
});
