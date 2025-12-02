import type { ReadonlyDeep } from 'type-fest';

import type {
  ConflictResolutionStrategy,
  ErrorResolutionStrategy,
} from '../loader/config-strategy.js';
import type { Brand, Id, Timestamp } from '../utilities/helper.js';
import type { PlanId } from './plan.js';

/**
 * A branded string representing the ID of a result.
 * This type is used to ensure type safety when working with result IDs.
 *
 * @example
 * ```ts
 * const resultId: ResultId = 'result_123' as ResultId;
 * ```
 *
 * @see {@link ResultResourceResolved}
 * @see {@link ResultResourceManifest}
 *
 * @category Runner.Result
 */
export type ResultId = Brand<Id<'result'>, 'ResultId'>;

/**
 * A resolved representation of a result.
 * This type is used to ensure type safety when working with result resources.
 *
 * @category Runner.Result
 */
export type ResultResourceResolved = {
  id: ResultId;
  planId: PlanId;
  status: 'failed' | 'skipped' | 'succeed';
  statusMessage: string;
  conflictSnapshot: {
    isConflicted: boolean;
    chosenResolution?: ConflictResolutionStrategy;
    currentContent?: string;
    targetContent?: string;
    diff?: string;
  };
  errorSnapshot: {
    isErrored: boolean;
    chosenResolution?: ErrorResolutionStrategy;
    error?: {
      name: string;
      message: string;
    };
  };
  execution: {
    startTime: Timestamp;
    endTime: Timestamp;
    durationMs: number;
  };
};

/**
 * A manifest representation of a result.
 * This type is used to ensure type safety when working with result resources.
 *
 * @category Runner.Result
 */
export type ResultResourceManifest = ReadonlyDeep<ResultResourceResolved>;
