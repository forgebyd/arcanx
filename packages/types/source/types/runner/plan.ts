import type { ReadonlyDeep } from 'type-fest';

import type { ConflictResolutionStrategy } from '../loader/config-strategy.js';
import type { Brand, Id } from '../utilities/helper.js';
import type { ArtifactResourceManifest } from './artifact.js';

/**
 * A branded string representing the ID of a plan.
 * This type is used to ensure type safety when working with plan IDs.
 *
 * @example
 * ```ts
 * const planId: PlanId = 'plan_123' as PlanId;
 * ```
 *
 * @see {@link PlanResourceResolved}
 * @see {@link PlanResourceManifest}
 *
 * @category Runner.Plan
 */
export type PlanId = Brand<Id<'plan'>, 'PlanId'>;

/**
 * A resolved representation of a plan.
 * This type is used to ensure type safety when working with plan resources.
 *
 * @category Runner.Plan
 */
export type PlanResourceResolved = {
  id: PlanId;
  artifact: ArtifactResourceManifest;
  conflictSnapshot: {
    isConflicted: boolean;
    suggestedResolution?: ConflictResolutionStrategy;
    currentContent?: string;
    targetContent?: string;
    diff?: string;
  };
};

/**
 * A manifest representation of a plan.
 * This type is used to ensure type safety when working with plan resources.
 *
 * @category Runner.Plan
 */
export type PlanResourceManifest = ReadonlyDeep<PlanResourceResolved>;
