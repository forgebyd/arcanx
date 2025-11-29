import type { ReadonlyDeep } from 'type-fest';

import type { Brand, Id } from '../utilities/helper.js';
import type { ArtifactResourceManifest } from './artifact.js';

export type PlanId = Brand<Id<'plan'>, 'PlanId'>;

export type PlanResourceResolved = {
  id: PlanId;
  artifact: ArtifactResourceManifest;
  conflictSnapshot: {
    isConflicted: boolean;
    currentContent?: string;
    targetContent?: string;
    diff?: string;
  };
};

export type PlanResourceManifest = ReadonlyDeep<PlanResourceResolved>;
