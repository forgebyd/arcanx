import type { IOFilesystem } from '../utilities/filesystem.js';
import type { IOLog } from '../utilities/log.js';

export type ContextIOManifest = Readonly<{
  filesystem: IOFilesystem;
  log: IOLog;
}>;
