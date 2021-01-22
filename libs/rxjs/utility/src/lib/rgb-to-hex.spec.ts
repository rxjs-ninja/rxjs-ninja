import { marbles } from 'rxjs-marbles/jest';
import { rgbToHex } from '@rxjs-ninja/rxjs-utility';

describe('rgbToHex', () => {
  it(
    'should convert an RGB string to a hex string',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', {
        a: 'rgb(0, 0, 0)',
        b: 'rgb(0, 255, 0)',
        c: 'rgb(255, 255, 255)',
        d: 'rgb(40, 111, 87)',
        e: 'rgb(1, 111, 0)',
      });
      const subs = '^----------!';
      const expected = m.cold('-a-b-c-d-e-|', { a: '#000000', b: '#00ff00', c: '#ffffff', d: '#286f57', e: '#016f00' });
      m.expect(input.pipe(rgbToHex())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should throw an error when it cannot parse',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', {
        a: 'rgb(0, 0, 0)',
        b: 'rgb(0, 255, 0)',
        c: 'RxJS Ninja',
        d: 'rgb(40, 111, 87)',
        e: 'rgb(1, 111, 0)',
      });
      const subs = '^----!';
      const expected = m.cold('-a-b-#', { a: '#000000', b: '#00ff00' }, new Error('No valid RGBA value to parse'));
      m.expect(input.pipe(rgbToHex())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should convert an RGB string to a hex string excluding the hash',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', {
        a: 'rgb(0, 0, 0)',
        b: 'rgb(0, 255, 0)',
        c: 'rgb(255, 255, 255)',
        d: 'rgb(40, 111, 87)',
        e: 'rgb(1, 111, 0)',
      });
      const subs = '^----------!';
      const expected = m.cold('-a-b-c-d-e-|', { a: '000000', b: '00ff00', c: 'ffffff', d: '286f57', e: '016f00' });
      m.expect(input.pipe(rgbToHex(true))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
