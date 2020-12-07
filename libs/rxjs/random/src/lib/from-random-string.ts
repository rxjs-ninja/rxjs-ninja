/**
 * @packageDocumentation
 * @module Random
 */
import { Observable, Subscriber, timer } from 'rxjs';
import { finalize, map, takeWhile, tap } from 'rxjs/operators';
import { FromRandomStringOpts } from '../types/from-string';

const allUpperCase: string[] = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const allLowerCase: string[] = [...'abcdefghijklmnopqrstuvwxyz'];
const allSpecialChars: string[] = [...'~!@#$%^&*()_+-=[]{}|;:\'",./<>?'];
const allNumbers: string[] = [...'0123456789'];

/**
 * The default options for `fromRandomStr`
 * @type FromRandomStringOpts
 */
const DEFAULT_OPTIONS: FromRandomStringOpts = {
  caps: true,
  lower: true,
  number: false,
  special: false,
};

/**
 * An Observable string value generator that generates random strings of the passed length, if an emit delay is passed
 * it will emit the value once per the time passed
 *
 * By default the string will be made up of upper and lower case characters, to include numbers and special characters
 * pass a [[FromRandomStringOpts]] options object
 *
 * @param length The length of the string to produce
 * @param emitDelay If set the observable will emit per millisecond set, by default this is 0
 * @param opts Additional options to include other characters and numbers
 *
 * @example
 * ```ts
 * fromRandomStr(5)
 * .subscribe() // 'AgtYb', 'brYgT', 'TLAvf'...
 * ```
 *
 * @returns Observable with a stream of random strings
 * @category Random Observables
 */
export function fromRandomStr(length = 10, emitDelay = 0, opts = DEFAULT_OPTIONS): Observable<string> {
  let seedArray: string[] = [];
  if (opts.caps) seedArray = [...seedArray, ...allUpperCase];
  if (opts.lower) seedArray = [...seedArray, ...allLowerCase];
  if (opts.number) seedArray = [...seedArray, ...allNumbers];
  if (opts.special) seedArray = [...seedArray, ...allSpecialChars];

  return new Observable((subscriber: Subscriber<string>) => {
    timer(0, emitDelay)
      .pipe(
        takeWhile(() => !subscriber.closed),
        map((value) => [...Array(length)].map(() => seedArray[(Math.random() * seedArray.length) | 0]).join('')),
        tap((value) => subscriber.next(value)),
        finalize(() => subscriber.complete()),
      )
      .subscribe();
  });
}
