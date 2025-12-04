import type { IOLog } from '@arcanx/types';
import debug from 'debug';

/**
 * Creates an instance of the IOLog type.
 * This type is used to ensure type safety when working with the debug
 * library.
 *
 * @returns {IOLog} An instance of the IOLog type.
 *
 * @example
 * ```ts
 * const log = createLog();
 * const debug = log.create('arcanx');
 *
 * log.enable('arcanx');
 *
 * debug('Hello #1');
 * debug('Hello #2');
 * ```
 *
 * @category Utility.Log
 */
export const createLog = (): IOLog => {
  return {
    coerce: debug.coerce,
    disable: debug.disable,
    enable: debug.enable,
    create: (namespace: string) => debug(namespace),
    humanize: debug.humanize,
    log: debug.log,
  };
};
