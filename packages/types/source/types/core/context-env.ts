import type { AbsolutePath } from '../utilities/path.js';

/**
 * A type representing the manifest of a context environment.
 * This type is used to ensure type safety when working with context environments.
 *
 * @category Core
 */
export type ContextEnvManifest = Readonly<{
  cwd: AbsolutePath;
}>;
