import { marbles } from 'rxjs-marbles/jest';
import { hexToRGBA } from '@rxjs-ninja/rxjs-utility';

describe('hexToRGBA', () => {
  it(
    'should convert a 3 part hex to RGB',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', {
        a: '#000000',
        b: '#00ff00',
        c: '#ffffff',
        d: '#286f57',
        e: '#016f00',
      });
      const subs = '^----------!';
      const expected = m.cold('-a-b-c-d-e-|', {
        a: 'rgb(0, 0, 0)',
        b: 'rgb(0, 255, 0)',
        c: 'rgb(255, 255, 255)',
        d: 'rgb(40, 111, 87)',
        e: 'rgb(1, 111, 0)',
      });
      m.expect(input.pipe(hexToRGBA())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should throw an error with an invalid hex',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', {
        a: '#000000',
        b: '#00ff00',
        c: 'RxJS Ninja',
        d: '#286f57',
        e: '#016f00',
      });
      const subs = '^----!';
      const expected = m.cold(
        '-a-b-#',
        {
          a: 'rgb(0, 0, 0)',
          b: 'rgb(0, 255, 0)',
        },
        new Error('Invalid HEX'),
      );
      m.expect(input.pipe(hexToRGBA())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should convert a 4 part hex to RGBA',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', {
        a: '#00000000',
        b: '#00ff0080',
        c: '#ffffffff',
        d: '#286f573d',
        e: '#016f00e6',
      });
      const subs = '^----------!';
      const expected = m.cold('-a-b-c-d-e-|', {
        a: 'rgba(0, 0, 0, 0)',
        b: 'rgba(0, 255, 0, 0.5)',
        c: 'rgba(255, 255, 255, 1)',
        d: 'rgba(40, 111, 87, 0.24)',
        e: 'rgba(1, 111, 0, 0.9)',
      });
      m.expect(input.pipe(hexToRGBA())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should convert a mixed strings to RGBA with default alpha',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', {
        a: '#00000000',
        b: '#00ff00',
        c: '#ffffffff',
        d: '#286f57',
        e: '#016f00e6',
      });
      const subs = '^----------!';
      const expected = m.cold('-a-b-c-d-e-|', {
        a: 'rgba(0, 0, 0, 0)',
        b: 'rgba(0, 255, 0, 0.4)',
        c: 'rgba(255, 255, 255, 1)',
        d: 'rgba(40, 111, 87, 0.4)',
        e: 'rgba(1, 111, 0, 0.9)',
      });
      m.expect(input.pipe(hexToRGBA(0.4))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
