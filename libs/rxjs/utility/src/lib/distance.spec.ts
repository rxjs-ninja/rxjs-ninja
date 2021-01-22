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

  // Inches
  describe('inches', () => {
    it(
      'should convert inches to cm with precision of `1`',
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
      'should convert inches to feet',
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
      'should convert inches to km',
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
      'should convert inches to meters',
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

    xit(
      'should convert inches to miles',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 420,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 0.000621,
          c: 0.00261,
        });
        m.expect(input.pipe(distance(Distances.INCHES, Distances.MILES))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    xit(
      'should convert inches to yards',
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
        m.expect(input.pipe(distance(Distances.INCHES, Distances.YARDS, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });
});
