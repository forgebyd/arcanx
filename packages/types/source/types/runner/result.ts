import type { ReadonlyDeep } from 'type-fest';

import type {
  ConflictResolutionStrategy,
  ErrorResolutionStrategy,
} from '../loader/config-strategy.js';
import type { Brand, Id, Timestamp } from '../utilities/helper.js';

export type ResultId = Brand<Id<'result'>, 'ResultId'>;

export type ResultResourceResolved = {
  id: ResultId;
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
    errorInstance?: Error;
  };
  execution: {
    startTime: Timestamp;
    endTime: Timestamp;
    durationMs: number;
  };
};

export type ResultResourceManifest = ReadonlyDeep<ResultResourceResolved>;
