import { marbles } from 'rxjs-marbles/jest';
import { rgbaToHex } from './rgba-to-hex';

describe('rgbaToHex', () => {
  it(
    'should convert an RGBA string to a hex string',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', {
        a: 'rgba(0, 0, 0, 0)',
        b: 'rgba(0, 255, 0, 0.5)',
        c: 'rgba(255, 255, 255, 1)',
        d: 'rgba(40, 111, 87, 0.24)',
        e: 'rgba(1, 111, 0, .9)',
      });
      const subs = '^----------!';
      const expected = m.cold('-a-b-c-d-e-|', {
        a: '#00000000',
        b: '#00ff0080',
        c: '#ffffffff',
        d: '#286f573d',
        e: '#016f00e6',
      });
      m.expect(input.pipe(rgbaToHex())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should throw an error when it cannot convert a value',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', {
        a: 'rgba(0, 0, 0, 0)',
        b: 'rgba(0, 255, 0, 0.5)',
        c: 'RxJS Ninja',
        d: 'rgba(40, 111, 87, 0.24)',
        e: 'rgba(1, 111, 0, .9)',
      });
      const subs = '^----!';
      const expected = m.cold(
        '-a-b-#',
        {
          a: '#00000000',
          b: '#00ff0080',
        },
        new Error('No valid RGBA value to parse'),
      );
      m.expect(input.pipe(rgbaToHex())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should convert an RGBA string to a hex string excluding the hash',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', {
        a: 'rgba(0, 0, 0, 0)',
        b: 'rgba(0, 255, 0, 0.5)',
        c: 'rgba(255, 255, 255, 1)',
        d: 'rgba(40, 111, 87, 0.24)',
        e: 'rgba(1, 111, 0, .9)',
      });
      const subs = '^----------!';
      const expected = m.cold('-a-b-c-d-e-|', {
        a: '00000000',
        b: '00ff0080',
        c: 'ffffffff',
        d: '286f573d',
        e: '016f00e6',
      });
      m.expect(input.pipe(rgbaToHex(true))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
