import type { AbsolutePath } from '../utilities/path.js';

export type ContextEnvManifest = Readonly<{
  cwd: AbsolutePath;
}>;
