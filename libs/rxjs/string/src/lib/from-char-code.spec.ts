import { tap } from 'rxjs/operators';
import { fromCharCode } from '@tinynodes/rxjs-string';
import { observe } from 'rxjs-marbles/jest';

describe('fromCharCode', () => {
  it(
    'should create string value from passed char codes',
    observe(() => fromCharCode([65, 66, 67, 68]).pipe(tap((value) => expect(value).toBe('ABCD')))),
  );
});
