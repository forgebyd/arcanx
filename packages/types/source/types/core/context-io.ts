import type { IOFilesystem } from '../utilities/filesystem.js';
import type { IOLog } from '../utilities/log.js';

/**
 * A type representing the manifest of a context IO.
 * This type is used to ensure type safety when working with context IO.
 *
 * @category Core
 */
export type ContextIOManifest = Readonly<{
  filesystem: IOFilesystem;
  log: IOLog;
}>;
