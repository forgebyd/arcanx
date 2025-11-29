import type { ReadonlyDeep } from 'type-fest';

import type { GeneratorResourceName } from '../loader/generator.js';
import type {
  GeneratorActionBuiltInType,
  GeneratorActionCustomType,
} from '../loader/generator-action.js';
import type { Brand, Id } from '../utilities/helper.js';
import type { AbsolutePath } from '../utilities/path.js';

export type ArtifactId = Brand<Id<'artifact'>, 'ArtifactId'>;

export type ArtifactResourceResolved = {
  id: ArtifactId;
  checksum: string;
  finalContent: string;
  rawContent: string;
  provenance: {
    actionType: GeneratorActionBuiltInType | GeneratorActionCustomType;
    generatorName: GeneratorResourceName;
    destinationPath: AbsolutePath;
    sourcePath: AbsolutePath;
  };
};

export type ArtifactResourceManifest = ReadonlyDeep<ArtifactResourceResolved>;
