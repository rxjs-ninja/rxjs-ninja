import { marbles } from 'rxjs-marbles/jest';
import { temperature, Temperatures } from '@rxjs-ninja/rxjs-utility';

describe('temperature', () => {
  describe('Celsius', () => {
    it(
      'should convert to Fahrenheit',
      marbles((m) => {
        const input = m.hot('-a-b-c-d-e|', {
          a: 0,
          b: 100,
          c: 37.5,
          d: -42,
          e: 100000,
        });
        const subs = '^---------!';
        const expected = m.cold('-a-b-c-d-e|', {
          a: 32,
          b: 212,
          c: 99.5,
          d: -43.6,
          e: 180032,
        });
        m.expect(input.pipe(temperature(Temperatures.CELSIUS, Temperatures.FAHRENHEIT))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to Kelvin',
      marbles((m) => {
        const input = m.hot('-a-b-c-d-e|', {
          a: 0,
          b: 100,
          c: 37.5,
          d: -42,
          e: 100000,
        });
        const subs = '^---------!';
        const expected = m.cold('-a-b-c-d-e|', {
          a: 273.2,
          b: 373.2,
          c: 310.7,
          d: 231.2,
          e: 100273.2,
        });
        m.expect(input.pipe(temperature(Temperatures.CELSIUS, Temperatures.KELVIN))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to Rankine',
      marbles((m) => {
        const input = m.hot('-a-b-c-d-e|', {
          a: 0,
          b: 100,
          c: 37.5,
          d: -42,
          e: 100000,
        });
        const subs = '^---------!';
        const expected = m.cold('-a-b-c-d-e|', {
          a: 491.7,
          b: 671.7,
          c: 559.2,
          d: 416.1,
          e: 180491.7,
        });
        m.expect(input.pipe(temperature(Temperatures.CELSIUS, Temperatures.RANKINE))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should return to 2 decimal places',
      marbles((m) => {
        const input = m.hot('-a-b-c-d-e|', {
          a: 0,
          b: 100.393,
          c: 37.53556,
          d: -42.32,
          e: 100000.3,
        });
        const subs = '^---------!';
        const expected = m.cold('-a-b-c-d-e|', {
          a: 0,
          b: 100.39,
          c: 37.54,
          d: -42.32,
          e: 100000.3,
        });
        m.expect(input.pipe(temperature(Temperatures.CELSIUS, Temperatures.CELSIUS, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  describe('Fahrenheit', () => {
    it(
      'should convert to Celsius',
      marbles((m) => {
        const input = m.hot('-a-b-c-d-e|', {
          a: 32,
          b: 212,
          c: 99.5,
          d: -43.6,
          e: 180032,
        });
        const subs = '^---------!';
        const expected = m.cold('-a-b-c-d-e|', {
          a: 0,
          b: 100,
          c: 37.5,
          d: -42,
          e: 100000,
        });
        m.expect(input.pipe(temperature(Temperatures.FAHRENHEIT, Temperatures.CELSIUS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to Kelvin',
      marbles((m) => {
        const input = m.hot('-a-b-c-d-e|', {
          a: 0,
          b: 100,
          c: 37.5,
          d: -42,
          e: 100000,
        });
        const subs = '^---------!';
        const expected = m.cold('-a-b-c-d-e|', {
          a: 255.4,
          b: 310.9,
          c: 276.2,
          d: 232,
          e: 55810.9,
        });
        m.expect(input.pipe(temperature(Temperatures.FAHRENHEIT, Temperatures.KELVIN))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to Rankine',
      marbles((m) => {
        const input = m.hot('-a-b-c-d-e|', {
          a: 0,
          b: 100,
          c: 37.5,
          d: -42,
          e: 100000,
        });
        const subs = '^---------!';
        const expected = m.cold('-a-b-c-d-e|', {
          a: 459.7,
          b: 559.7,
          c: 497.2,
          d: 417.7,
          e: 100459.7,
        });
        m.expect(input.pipe(temperature(Temperatures.FAHRENHEIT, Temperatures.RANKINE))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should return to 2 decimal places',
      marbles((m) => {
        const input = m.hot('-a-b-c-d-e|', {
          a: 0,
          b: 100.393,
          c: 37.53556,
          d: -42.32,
          e: 100000.3,
        });
        const subs = '^---------!';
        const expected = m.cold('-a-b-c-d-e|', {
          a: 0,
          b: 100.39,
          c: 37.54,
          d: -42.32,
          e: 100000.3,
        });
        m.expect(input.pipe(temperature(Temperatures.FAHRENHEIT, Temperatures.FAHRENHEIT, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  describe('Kelvin', () => {
    it(
      'should convert to Celsius',
      marbles((m) => {
        const input = m.hot('-a-b-c-d-e|', {
          a: 32,
          b: 212,
          c: 99.5,
          d: -43.6,
          e: 180032,
        });
        const subs = '^---------!';
        const expected = m.cold('-a-b-c-d-e|', {
          a: -241.1,
          b: -61.1,
          c: -173.6,
          d: -316.7,
          e: 179758.9,
        });
        m.expect(input.pipe(temperature(Temperatures.KELVIN, Temperatures.CELSIUS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to Fahrenheit',
      marbles((m) => {
        const input = m.hot('-a-b-c-d-e|', {
          a: 0,
          b: 100,
          c: 37.5,
          d: -42,
          e: 100000,
        });
        const subs = '^---------!';
        const expected = m.cold('-a-b-c-d-e|', {
          a: -459.7,
          b: -279.7,
          c: -392.2,
          d: -535.3,
          e: 179540.3,
        });
        m.expect(input.pipe(temperature(Temperatures.KELVIN, Temperatures.FAHRENHEIT))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to Rankine',
      marbles((m) => {
        const input = m.hot('-a-b-c-d-e|', {
          a: 0,
          b: 100,
          c: 37.5,
          d: -42,
          e: 100000,
        });
        const subs = '^---------!';
        const expected = m.cold('-a-b-c-d-e|', {
          a: 0,
          b: 180,
          c: 67.5,
          d: -75.6,
          e: 180000,
        });
        m.expect(input.pipe(temperature(Temperatures.KELVIN, Temperatures.RANKINE))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should return to 2 decimal places',
      marbles((m) => {
        const input = m.hot('-a-b-c-d-e|', {
          a: 0,
          b: 100.393,
          c: 37.53556,
          d: -42.32,
          e: 100000.3,
        });
        const subs = '^---------!';
        const expected = m.cold('-a-b-c-d-e|', {
          a: 0,
          b: 100.39,
          c: 37.54,
          d: -42.32,
          e: 100000.3,
        });
        m.expect(input.pipe(temperature(Temperatures.KELVIN, Temperatures.KELVIN, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  describe('Rankine', () => {
    it(
      'should convert to Celsius',
      marbles((m) => {
        const input = m.hot('-a-b-c-d-e|', {
          a: 32,
          b: 212,
          c: 99.5,
          d: -43.6,
          e: 180032,
        });
        const subs = '^---------!';
        const expected = m.cold('-a-b-c-d-e|', {
          a: -827.4,
          b: -503.4,
          c: -705.9,
          d: -963.5,
          e: 323172.6,
        });
        m.expect(input.pipe(temperature(Temperatures.RANKINE, Temperatures.CELSIUS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to Fahrenheit',
      marbles((m) => {
        const input = m.hot('-a-b-c-d-e|', {
          a: 0,
          b: 100,
          c: 37.5,
          d: -42,
          e: 100000,
        });
        const subs = '^---------!';
        const expected = m.cold('-a-b-c-d-e|', {
          a: -491.7,
          b: -391.7,
          c: -454.2,
          d: -533.7,
          e: 99508.3,
        });
        m.expect(input.pipe(temperature(Temperatures.RANKINE, Temperatures.FAHRENHEIT))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert to Kelvin',
      marbles((m) => {
        const input = m.hot('-a-b-c-d-e|', {
          a: 0,
          b: 100,
          c: 37.5,
          d: -42,
          e: 100000,
        });
        const subs = '^---------!';
        const expected = m.cold('-a-b-c-d-e|', {
          a: 0,
          b: 55.6,
          c: 20.8,
          d: -23.3,
          e: 55555.6,
        });
        m.expect(input.pipe(temperature(Temperatures.RANKINE, Temperatures.KELVIN))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should return to 2 decimal places',
      marbles((m) => {
        const input = m.hot('-a-b-c-d-e|', {
          a: 0,
          b: 100.393,
          c: 37.53556,
          d: -42.32,
          e: 100000.3,
        });
        const subs = '^---------!';
        const expected = m.cold('-a-b-c-d-e|', {
          a: 0,
          b: 100.39,
          c: 37.54,
          d: -42.32,
          e: 100000.3,
        });
        m.expect(input.pipe(temperature(Temperatures.RANKINE, Temperatures.RANKINE, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });
});
