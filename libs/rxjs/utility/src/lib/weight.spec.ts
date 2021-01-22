import { marbles } from 'rxjs-marbles/jest';
import { weight, Weights } from '@rxjs-ninja/rxjs-utility';

describe('weight', () => {
  it(
    'return the value for unrecognised weight',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: 0,
        b: 100,
        c: 1000,
      });
      const subs = '^------!';
      const expected = m.cold('-a-b-c-|', {
        a: 0,
        b: 100,
        c: 1000,
      });
      m.expect(input.pipe(weight('foobar', Weights.KG))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  // Grams
  describe('grams', () => {
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
        m.expect(input.pipe(weight(Weights.G, Weights.KG))).toBeObservable(expected);
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
          c: 2.205,
        });
        m.expect(input.pipe(weight(Weights.G, Weights.LB))).toBeObservable(expected);
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
          b: 3.527,
          c: 35.274,
        });
        m.expect(input.pipe(weight(Weights.G, Weights.OZ))).toBeObservable(expected);
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
          b: 0.016,
          c: 0.157,
        });
        m.expect(input.pipe(weight(Weights.G, Weights.ST))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  // Kilograms
  describe('kilograms', () => {
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
        m.expect(input.pipe(weight(Weights.KG, Weights.G))).toBeObservable(expected);
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
        m.expect(input.pipe(weight(Weights.KG, Weights.LB))).toBeObservable(expected);
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
        m.expect(input.pipe(weight(Weights.KG, Weights.OZ))).toBeObservable(expected);
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
        m.expect(input.pipe(weight(Weights.KG, Weights.ST))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  // Pounds
  describe('Pounds', () => {
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
          b: 45359.702,
          c: 453597.024,
        });
        m.expect(input.pipe(weight(Weights.LB, Weights.G))).toBeObservable(expected);
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
          c: 453.597,
        });
        m.expect(input.pipe(weight(Weights.LB, Weights.KG))).toBeObservable(expected);
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
        m.expect(input.pipe(weight(Weights.LB, Weights.OZ))).toBeObservable(expected);
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
          b: 7.143,
          c: 71.429,
        });
        m.expect(input.pipe(weight(Weights.LB, Weights.ST))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  // Ounces
  describe('Ounces', () => {
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
          b: 2834.949,
          c: 28349.493,
        });
        m.expect(input.pipe(weight(Weights.OZ, Weights.G))).toBeObservable(expected);
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
          b: 2.835,
          c: 28.349,
        });
        m.expect(input.pipe(weight(Weights.OZ, Weights.KG))).toBeObservable(expected);
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
        m.expect(input.pipe(weight(Weights.OZ, Weights.LB))).toBeObservable(expected);
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
          b: 0.446,
          c: 4.464,
        });
        m.expect(input.pipe(weight(Weights.OZ, Weights.ST))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  // Stones
  describe('Stones', () => {
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
          b: 635041.595,
          c: 6350415.952,
        });
        m.expect(input.pipe(weight(Weights.ST, Weights.G))).toBeObservable(expected);
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
          b: 635.042,
          c: 6350.416,
        });
        m.expect(input.pipe(weight(Weights.ST, Weights.KG))).toBeObservable(expected);
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
        m.expect(input.pipe(weight(Weights.ST, Weights.LB))).toBeObservable(expected);
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
        m.expect(input.pipe(weight(Weights.ST, Weights.OZ))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });
});
