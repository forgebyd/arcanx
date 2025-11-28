import type { ReadonlyDeep } from 'type-fest';

import type { Brand, Id } from '../utilities/helper.js';
import type { ArtifactId, ArtifactResourceManifest } from './artifact.js';
import type { PlanId } from './plan.js';
import type { ResultId, ResultResourceManifest } from './result.js';

export type ReportId = Brand<Id<'report'>, 'ReportId'>;

export type ReportResourceResolved = {
  id: ReportId;
  artifactId: ArtifactId;
  planId: PlanId;
  resultId: ResultId;
  conflict: Pick<
    ResultResourceManifest['conflictSnapshot'],
    'isConflicted' | 'chosenResolution' | 'diff'
  >;
  error: Pick<
    ResultResourceManifest['errorSnapshot'],
    'isErrored' | 'chosenResolution' | 'errorInstance'
  >;
  provenance: ArtifactResourceManifest['provenance'];
  status: ResultResourceManifest['status'];
  statusMessage: ResultResourceManifest['statusMessage'];
};

export type ReportResourceManifest = ReadonlyDeep<ReportResourceResolved>;
