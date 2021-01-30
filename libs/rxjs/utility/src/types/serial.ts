export type ParityType = 'none' | 'even' | 'odd' | 'mark' | 'space';

/**
 * @internal
 * @private
 */
export interface SerialOptions {
  baudRate: number;
  dataBits?: number;
  stopBits?: number;
  parity?: ParityType;
  bufferSize?: number;
  flowControl?: string;
}


/**
 * @internal
 * @private
 */
export interface SerialPort {
  onconnect: ((this: WindowEventHandlers, ev: Event) => any) | null;
  ondisconnect: ((this: WindowEventHandlers, ev: Event) => any) | null;
  readable: ReadableStream;
  writable: WritableStream;
  open: (options: SerialOptions) => Promise<undefined>;
  close: () => Promise<undefined>;
}
