import type { UnknownRecord } from 'type-fest';

import type { ConfigManifest } from '../loader/config.js';
import type { GeneratorResourceName } from '../loader/generator.js';
import type { ArtifactResourceManifest } from '../runner/artifact.js';
import type { PlanResourceManifest } from '../runner/plan.js';
import type { ReportResourceManifest } from '../runner/report.js';
import type { ResultResourceManifest } from '../runner/result.js';
import type { ContextEnvManifest } from './context-env.js';
import type { ContextIOManifest } from './context-io.js';
import type { ContextResourceManifest } from './context-resource.js';
import type {
  ContextRuntimeId,
  ContextRuntimeManifest,
} from './context-runtime.js';

/**
 * A context object passed to a hook function.
 * This object contains information about the current context.
 * This type is used to ensure type safety when working with hooks.
 *
 * @category Core
 */
export type HookContext = {
  runtimeId: ContextRuntimeId;
  runtimeCommand: string;
  generatorName?: GeneratorResourceName;
  behavior?: ConfigManifest['behavior'];
  strategy?: ConfigManifest['strategy'];
};

/**
 * A context object passed to a run function.
 * This object contains information about the current context.
 * This type is used to ensure type safety when working with run functions.
 *
 * @category Core
 */
export type RunContext = {
  config: ConfigManifest;
  env: ContextEnvManifest;
  io: ContextIOManifest;
  resource: ContextResourceManifest;
  runtime: ContextRuntimeManifest;
  state: {
    answers: UnknownRecord;
    artifacts: ArtifactResourceManifest[];
    plans: PlanResourceManifest[];
    reports: ReportResourceManifest[];
    results: ResultResourceManifest[];
  };
};
