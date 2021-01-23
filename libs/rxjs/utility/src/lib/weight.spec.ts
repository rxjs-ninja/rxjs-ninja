import { marbles } from 'rxjs-marbles/jest';
import { weight, Weights } from '@rxjs-ninja/rxjs-utility';

describe('weight', () => {
  // Grams
  describe('grams', () => {
    it(
      'should return same value with precision 3',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100.2568,
          c: 1000.2535,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 100.257,
          c: 1000.254,
        });
        m.expect(input.pipe(weight(Weights.GRAMS, Weights.GRAMS, 3))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
    it(
      'should convert to kg',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 1000,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 0.1,
          c: 1,
        });
        m.expect(input.pipe(weight(Weights.GRAMS, Weights.KILOGRAMS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to lb',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 1000,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 0.22,
          c: 2.2,
        });
        m.expect(input.pipe(weight(Weights.GRAMS, Weights.POUNDS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to oz',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 1000,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 3.53,
          c: 35.27,
        });
        m.expect(input.pipe(weight(Weights.GRAMS, Weights.OUNCES))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to st',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 1000,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 0.02,
          c: 0.16,
        });
        m.expect(input.pipe(weight(Weights.GRAMS, Weights.STONE))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  // Kilograms
  describe('kilograms', () => {
    it(
      'should return same value with precision 3',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100.2568,
          c: 1000.2535,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 100.257,
          c: 1000.254,
        });
        m.expect(input.pipe(weight(Weights.KILOGRAMS, Weights.KILOGRAMS, 3))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
    it(
      'should convert to g',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 1000,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 100000,
          c: 1000000,
        });
        m.expect(input.pipe(weight(Weights.KILOGRAMS, Weights.GRAMS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to lb',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 1000,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 220.46,
          c: 2204.6,
        });
        m.expect(input.pipe(weight(Weights.KILOGRAMS, Weights.POUNDS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to oz',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 1000,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 3527.4,
          c: 35274,
        });
        m.expect(input.pipe(weight(Weights.KILOGRAMS, Weights.OUNCES))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to st',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 1000,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 15.74,
          c: 157.4,
        });
        m.expect(input.pipe(weight(Weights.KILOGRAMS, Weights.STONE))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  // Pounds
  describe('Pounds', () => {
    it(
      'should return same value with precision 3',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100.2568,
          c: 1000.2535,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 100.257,
          c: 1000.254,
        });
        m.expect(input.pipe(weight(Weights.POUNDS, Weights.POUNDS, 3))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
    it(
      'should convert to g',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 1000,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 45359.7,
          c: 453597.02,
        });
        m.expect(input.pipe(weight(Weights.POUNDS, Weights.GRAMS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to kg',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 1000,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 45.36,
          c: 453.6,
        });
        m.expect(input.pipe(weight(Weights.POUNDS, Weights.KILOGRAMS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to oz',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 1000,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 1600,
          c: 16000,
        });
        m.expect(input.pipe(weight(Weights.POUNDS, Weights.OUNCES))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to st',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 1000,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 7.14,
          c: 71.43,
        });
        m.expect(input.pipe(weight(Weights.POUNDS, Weights.STONE))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  // Ounces
  describe('Ounces', () => {
    it(
      'should return same value with precision 3',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100.2568,
          c: 1000.2535,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 100.257,
          c: 1000.254,
        });
        m.expect(input.pipe(weight(Weights.OUNCES, Weights.OUNCES, 3))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
    it(
      'should convert to g',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 1000,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 2834.95,
          c: 28349.49,
        });
        m.expect(input.pipe(weight(Weights.OUNCES, Weights.GRAMS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to kg',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 1000,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 2.83,
          c: 28.35,
        });
        m.expect(input.pipe(weight(Weights.OUNCES, Weights.KILOGRAMS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to lb',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 1000,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 6.25,
          c: 62.5,
        });
        m.expect(input.pipe(weight(Weights.OUNCES, Weights.POUNDS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to st',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 1000,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 0.45,
          c: 4.46,
        });
        m.expect(input.pipe(weight(Weights.OUNCES, Weights.STONE))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  // Stones
  describe('Stones', () => {
    it(
      'should return same value with precision 3',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100.2568,
          c: 1000.2535,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 100.257,
          c: 1000.254,
        });
        m.expect(input.pipe(weight(Weights.STONE, Weights.STONE, 3))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
    it(
      'should convert to g',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 1000,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 635041.6,
          c: 6350415.95,
        });
        m.expect(input.pipe(weight(Weights.STONE, Weights.GRAMS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to kg',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 1000,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 635.04,
          c: 6350.42,
        });
        m.expect(input.pipe(weight(Weights.STONE, Weights.KILOGRAMS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to lb',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 1000,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 1400,
          c: 14000,
        });
        m.expect(input.pipe(weight(Weights.STONE, Weights.POUNDS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to oz',
      marbles((m) => {
        const input = m.hot('-a-b-c-|', {
          a: 0,
          b: 100,
          c: 1000,
        });
        const subs = '^------!';
        const expected = m.cold('-a-b-c-|', {
          a: 0,
          b: 22400,
          c: 224000,
        });
        m.expect(input.pipe(weight(Weights.STONE, Weights.OUNCES))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });
});
