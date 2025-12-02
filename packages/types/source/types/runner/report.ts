import type { ReadonlyDeep } from 'type-fest';

import type { Brand, Id } from '../utilities/helper.js';
import type { ResultId, ResultResourceManifest } from './result.js';

/**
 * A branded string representing the ID of a report.
 * This type is used to ensure type safety when working with report IDs.
 *
 * @example
 * ```ts
 * const reportId: ReportId = 'report_123' as ReportId;
 * ```
 *
 * @see {@link ReportResourceResolved}
 * @see {@link ReportResourceManifest}
 *
 * @category Runner.Report
 */
export type ReportId = Brand<Id<'report'>, 'ReportId'>;

/**
 * A resolved representation of a report.
 * This type is used to ensure type safety when working with report resources.
 *
 * @category Runner.Report
 */
export type ReportResourceResolved = {
  id: ReportId;
  resultId: ResultId;
  status: ResultResourceManifest['status'];
  statusMessage: ResultResourceManifest['statusMessage'];
};

/**
 * A manifest representation of a report.
 * This type is used to ensure type safety when working with report resources.
 *
 * @category Runner.Report
 */
export type ReportResourceManifest = ReadonlyDeep<ReportResourceResolved>;
