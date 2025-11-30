import type { ReadonlyDeep } from 'type-fest';

import type { GeneratorResourceName } from '../loader/generator.js';
import type {
  GeneratorActionBuiltInType,
  GeneratorActionCustomType,
} from '../loader/generator-action.js';
import type { Brand, Id } from '../utilities/helper.js';
import type { AbsolutePath } from '../utilities/path.js';

/**
 * A branded string representing the ID of an artifact.
 * This type is used to ensure type safety when working with artifact IDs.
 *
 * @example
 * ```ts
 * const artifactId: ArtifactId = 'artifact_123' as ArtifactId;
 * ```
 *
 * @see {@link ArtifactResourceResolved}
 * @see {@link ArtifactResourceManifest}
 *
 * @category Runner
 */
export type ArtifactId = Brand<Id<'artifact'>, 'ArtifactId'>;

/**
 * A resolved representation of an artifact.
 * This type is used to ensure type safety when working with artifact resources.
 *
 * @category Runner
 */
export type ArtifactResourceResolved = {
  id: ArtifactId;
  checksum: string;
  finalContent: string;
  finalDestinationPath: AbsolutePath;
  provenances: {
    actionType: GeneratorActionBuiltInType | GeneratorActionCustomType;
    generatorName: GeneratorResourceName;
    destinationPath: AbsolutePath;
    sourcePath: AbsolutePath;
  }[];
};

/**
 * A manifest representation of an artifact.
 * This type is used to ensure type safety when working with artifact resources.
 *
 * @category Runner
 */
export type ArtifactResourceManifest = ReadonlyDeep<ArtifactResourceResolved>;
