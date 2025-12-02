import type { Simplify } from 'type-fest';

import type { HookContext, RunContext } from '../core/context.js';
import type { ContextResourceResolved } from '../core/context-resource.js';
import type { ArtifactResourceResolved } from '../runner/artifact.js';
import type {
  PlanResourceManifest,
  PlanResourceResolved,
} from '../runner/plan.js';
import type { ReportResourceManifest } from '../runner/report.js';
import type { ResultResourceManifest } from '../runner/result.js';
import type { ConfigResolved } from './config.js';

/**
 * A hook function that can be registered with a config.
 * Run when the app is initialized.
 *
 * @param context - The context object passed to the hook.
 *
 * @see {@link ConfigHookSpec}
 * @see {@link ConfigHookResolved}
 * @see {@link ConfigHookManifest}
 *
 * @category Loader.ConfigHook
 */
export type OnInitializedHook = (context: HookContext) => void;

/**
 * A hook function that can be registered with a config.
 * Run when the context is created.
 *
 * @param context - The context object passed to the hook.
 * @param runContext - The run context object passed to the hook.
 *
 * @returns Modified run context.
 *
 * @see {@link ConfigHookSpec}
 * @see {@link ConfigHookResolved}
 * @see {@link ConfigHookManifest}
 *
 * @category Loader.ConfigHook
 */
export type OnContextCreatedHook = (
  context: HookContext,
  runContext: RunContext
) => RunContext;

/**
 * A hook function that can be registered with a config.
 * Run when the config is loaded.
 *
 * @param context - The context object passed to the hook.
 * @param config - The config object passed to the hook.
 *
 * @returns Modified config.
 *
 * @see {@link ConfigHookSpec}
 * @see {@link ConfigHookResolved}
 * @see {@link ConfigHookManifest}
 *
 * @category Loader.ConfigHook
 */
export type OnConfigLoadedHook = (
  context: HookContext,
  config: ConfigResolved
) => ConfigResolved;

/**
 * A hook function that can be registered with a config.
 * Run when a resource is loaded.
 *
 * @param context - The context object passed to the hook.
 * @param resource - The resource object passed to the hook.
 *
 * @returns Modified resource.
 *
 * @see {@link ConfigHookSpec}
 * @see {@link ConfigHookResolved}
 * @see {@link ConfigHookManifest}
 *
 * @category Loader.ConfigHook
 */
export type OnResourceLoadedHook = (
  context: HookContext,
  resource: ContextResourceResolved
) => ContextResourceResolved;

/**
 * A hook function that can be registered with a config.
 * Run when artifacts are rendered.
 *
 * @param context - The context object passed to the hook.
 * @param artifacts - The artifacts array passed to the hook.
 *
 * @returns Modified artifacts.
 *
 * @see {@link ConfigHookSpec}
 * @see {@link ConfigHookResolved}
 * @see {@link ConfigHookManifest}
 *
 * @category Loader.ConfigHook
 */
export type OnRenderedHook = (
  context: HookContext,
  artifacts: ArtifactResourceResolved[]
) => ArtifactResourceResolved[];

/**
 * A hook function that can be registered with a config.
 * Run when plans are planned.
 *
 * @param context - The context object passed to the hook.
 * @param plans - The plans array passed to the hook.
 *
 * @returns Modified plans.
 *
 * @see {@link ConfigHookSpec}
 * @see {@link ConfigHookResolved}
 * @see {@link ConfigHookManifest}
 *
 * @category Loader.ConfigHook
 */
export type OnPlannedHook = (
  context: HookContext,
  plans: PlanResourceResolved[]
) => PlanResourceResolved[];

/**
 * A hook function that can be registered with a config.
 * Run when results are applied.
 *
 * @param context - The context object passed to the hook.
 * @param results - The results array passed to the hook.
 *
 * @see {@link ConfigHookSpec}
 * @see {@link ConfigHookResolved}
 * @see {@link ConfigHookManifest}
 *
 * @category Loader.ConfigHook
 */
export type OnAppliedHook = (
  context: HookContext,
  results: Simplify<
    ResultResourceManifest & {
      readonly plan: PlanResourceManifest;
    }
  >[]
) => void;

/**
 * A hook function that can be registered with a config.
 * Run when the app is finalized.
 *
 * @param context - The context object passed to the hook.
 *
 * @see {@link ConfigHookSpec}
 * @see {@link ConfigHookResolved}
 * @see {@link ConfigHookManifest}
 *
 * @category Loader.ConfigHook
 */
export type OnFinalizedHook = (context: HookContext) => void;

/**
 * A hook function that can be registered with a config.
 * Run when reports are reported.
 *
 * @param context - The context object passed to the hook.
 * @param reports - The reports array passed to the hook.
 *
 * @see {@link ConfigHookSpec}
 * @see {@link ConfigHookResolved}
 * @see {@link ConfigHookManifest}
 *
 * @category Loader.ConfigHook
 */
export type OnReportedHook = (
  context: HookContext,
  reports: Simplify<
    ReportResourceManifest & {
      readonly result: Simplify<
        ResultResourceManifest & {
          readonly plan: PlanResourceManifest;
        }
      >;
    }
  >[]
) => void;

/**
 * A collection of hook functions
 * that can be registered with a config.
 *
 * @category Loader.ConfigHook
 */
export type ConfigHookSpec = {
  onInitialized?: OnInitializedHook;
  onContextCreated?: OnContextCreatedHook;
  onConfigLoaded?: OnConfigLoadedHook;
  onResourceLoaded?: OnResourceLoadedHook;
  onRendered?: OnRenderedHook;
  onPlanned?: OnPlannedHook;
  onApplied?: OnAppliedHook;
  onFinalized?: OnFinalizedHook;
  onReported?: OnReportedHook;
};

/**
 * A collection of resolved hook functions
 * that can be registered with a config.
 *
 * @category Loader.ConfigHook
 */
export type ConfigHookResolved = {
  onInitialized: OnInitializedHook;
  onContextCreated: OnContextCreatedHook;
  onConfigLoaded: OnConfigLoadedHook;
  onResourceLoaded: OnResourceLoadedHook;
  onRendered: OnRenderedHook;
  onPlanned: OnPlannedHook;
  onApplied: OnAppliedHook;
  onFinalized: OnFinalizedHook;
  onReported: OnReportedHook;
};

/**
 * A collection of manifested hook functions
 * that can be registered with a config.
 *
 * @category Loader.ConfigHook
 */
export type ConfigHookManifest = Readonly<ConfigHookResolved>;
