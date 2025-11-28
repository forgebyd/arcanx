import type { ReadonlyDeep } from 'type-fest';

import type { GeneratorResourceName } from '../loader/generator.js';
import type {
  GeneratorActionBuiltInType,
  GeneratorActionCustomType,
} from '../loader/generator-action.js';
import type { Brand, Id, Timestamp } from '../utilities/helper.js';
import type { AbsolutePath } from '../utilities/path.js';

export type ArtifactId = Brand<Id<'artifact'>, 'ArtifactId'>;

export type ArtifactResourceResolved = {
  id: ArtifactId;
  data: Record<string, unknown>;
  rawContent: string;
  finalContent: string;
  execution: {
    startTime: Timestamp;
    endTime: Timestamp;
    durationMs: number;
  };
  provenance: {
    actionType: GeneratorActionBuiltInType | GeneratorActionCustomType;
    generatorName: GeneratorResourceName;
    destinationPath: AbsolutePath;
    sourcePath: AbsolutePath;
  };
  checksum: string;
};

export type ArtifactResourceManifest = ReadonlyDeep<ArtifactResourceResolved>;
