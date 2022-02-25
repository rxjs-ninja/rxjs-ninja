import { marbles } from 'rxjs-marbles/jest';
import { Temperatures } from '../types/temperature';
import { temperature } from './temperature';

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
          a: 273.15,
          b: 373.15,
          c: 310.65,
          d: 231.15,
          e: 100273.15,
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
          a: 491.67,
          b: 671.67,
          c: 559.17,
          d: 416.07,
          e: 180491.67,
        });
        m.expect(input.pipe(temperature(Temperatures.CELSIUS, Temperatures.RANKINE))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should return to 3 decimal places',
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
          b: 100.393,
          c: 37.536,
          d: -42.32,
          e: 100000.3,
        });
        m.expect(input.pipe(temperature(Temperatures.CELSIUS, Temperatures.CELSIUS, 3))).toBeObservable(expected);
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
          a: 255.37,
          b: 310.93,
          c: 276.21,
          d: 232.04,
          e: 55810.93,
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
          a: 459.67,
          b: 559.67,
          c: 497.17,
          d: 417.67,
          e: 100459.67,
        });
        m.expect(input.pipe(temperature(Temperatures.FAHRENHEIT, Temperatures.RANKINE))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should return to 3 decimal places',
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
          b: 100.393,
          c: 37.536,
          d: -42.32,
          e: 100000.3,
        });
        m.expect(input.pipe(temperature(Temperatures.FAHRENHEIT, Temperatures.FAHRENHEIT, 3))).toBeObservable(expected);
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
          a: -241.15,
          b: -61.15,
          c: -173.65,
          d: -316.75,
          e: 179758.85,
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
          a: -459.67,
          b: -279.67,
          c: -392.17,
          d: -535.27,
          e: 179540.33,
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
      'should return to 3 decimal places',
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
          b: 100.393,
          c: 37.536,
          d: -42.32,
          e: 100000.3,
        });
        m.expect(input.pipe(temperature(Temperatures.KELVIN, Temperatures.KELVIN, 3))).toBeObservable(expected);
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
          a: -827.41,
          b: -503.41,
          c: -705.91,
          d: -963.49,
          e: 323172.59,
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
          a: -491.67,
          b: -391.67,
          c: -454.17,
          d: -533.67,
          e: 99508.33,
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
          b: 55.56,
          c: 20.83,
          d: -23.33,
          e: 55555.56,
        });
        m.expect(input.pipe(temperature(Temperatures.RANKINE, Temperatures.KELVIN))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should return to 3 decimal places',
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
          b: 100.393,
          c: 37.536,
          d: -42.32,
          e: 100000.3,
        });
        m.expect(input.pipe(temperature(Temperatures.RANKINE, Temperatures.RANKINE, 3))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });
});
