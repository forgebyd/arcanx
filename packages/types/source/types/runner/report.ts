import type { ReadonlyDeep } from 'type-fest';

import type { Brand, Id } from '../utilities/helper.js';
import type { ArtifactId } from './artifact.js';
import type { PlanId } from './plan.js';
import type { ResultId, ResultResourceManifest } from './result.js';

export type ReportId = Brand<Id<'report'>, 'ReportId'>;

export type ReportResourceResolved = {
  id: ReportId;
  artifactId: ArtifactId;
  planId: PlanId;
  resultId: ResultId;
  status: ResultResourceManifest['status'];
  statusMessage: ResultResourceManifest['statusMessage'];
};

export type ReportResourceManifest = ReadonlyDeep<ReportResourceResolved>;
