import { marbles } from 'rxjs-marbles/jest';
import { Temperature, temperature } from '@rxjs-ninja/rxjs-utility';

describe('temperature', () => {
  // This test is only needed once
  it(
    'should return the value if the input temperatures are not known',
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
        b: 100,
        c: 37.5,
        d: -42,
        e: 100000,
      });
      m.expect(input.pipe(temperature('foobar', Temperature.FAHRENHEIT))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  describe('Celsius', () => {
    it(
      'should convert values from Celsius to Fahrenheit',
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
        m.expect(input.pipe(temperature(Temperature.CELSIUS, Temperature.FAHRENHEIT))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert values from Celsius to Kelvin',
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
        m.expect(input.pipe(temperature(Temperature.CELSIUS, 'kelvin'))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should return Celsius to 2 decimal places',
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
        m.expect(input.pipe(temperature(Temperature.CELSIUS, Temperature.CELSIUS, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  describe('Fahrenheit', () => {
    it(
      'should convert values from Fahrenheit to Celsius',
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
        m.expect(input.pipe(temperature(Temperature.FAHRENHEIT, Temperature.CELSIUS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert values from Fahrenheit to Kelvin',
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
        m.expect(input.pipe(temperature(Temperature.FAHRENHEIT, 'kelvin'))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should return Fahrenheit to 2 decimal places',
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
        m.expect(input.pipe(temperature(Temperature.FAHRENHEIT, Temperature.FAHRENHEIT, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });

  describe('Kelvin', () => {
    it(
      'should convert values from Kelvin to Celsius',
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
        m.expect(input.pipe(temperature(Temperature.KELVIN, Temperature.CELSIUS))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should convert values from Kelvin to Fahrenheit',
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
        m.expect(input.pipe(temperature(Temperature.KELVIN, Temperature.FAHRENHEIT))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );

    it(
      'should return Kelvin to 2 decimal places',
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
        m.expect(input.pipe(temperature(Temperature.KELVIN, Temperature.KELVIN, 2))).toBeObservable(expected);
        m.expect(input).toHaveSubscriptions(subs);
      }),
    );
  });
});
