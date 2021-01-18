/**
 * @packageDocumentation
 * @module Utility
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { parseJwt } from '../utils/jwt-token';

/**
 * Returns an Observable that emits an object from a parsed JWT token
 *
 * @category Mapping
 *
 * @typeParam T The known JWT response object
 *
 * @example Parse a JWT token and return the decoded body
 * ```ts
 * const input =
 *   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
 *   of(input).pipe(decodeJWT()).subscribe()
 * ```
 * Output: `{ "sub": "1234567890", "name": "John Doe", "iat": 1516239022}`
 *
 * @returns Observable that emits a decoded JWT token body
 */
export function decodeJWT<T extends Record<string, unknown>>(): OperatorFunction<string, T> {
  return (source) => source.pipe(map((value) => parseJwt(value)));
}
