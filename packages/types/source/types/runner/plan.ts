import type { ReadonlyDeep } from 'type-fest';

import type { ConflictResolutionStrategy } from '../loader/config-strategy.js';
import type { Brand, Id, Timestamp } from '../utilities/helper.js';
import type { ArtifactResourceManifest } from './artifact.js';

export type PlanId = Brand<Id<'plan'>, 'PlanId'>;

export type PlanResourceResolved = {
  id: PlanId;
  artifact: ArtifactResourceManifest;
  conflictSnapshot: {
    isConflicted: boolean;
    chosenResolution?: ConflictResolutionStrategy;
    currentContent?: string;
    targetContent?: string;
    diff?: string;
  };
  execution: {
    startTime: Timestamp;
    endTime: Timestamp;
    durationMs: number;
  };
};

export type PlanResourceManifest = ReadonlyDeep<PlanResourceResolved>;
