import type { HookContext, RunContext } from '../core/context.js';
import type { ContextResourceResolved } from '../core/context-resource.js';
import type { ArtifactResourceResolved } from '../runner/artifact.js';
import type { PlanResourceResolved } from '../runner/plan.js';
import type { ReportResourceManifest } from '../runner/report.js';
import type { ResultResourceManifest } from '../runner/result.js';
import type { ConfigResolved } from './config.js';

export type OnInitializedHook = (context: HookContext) => void;

export type OnContextCreatedHook = (
  context: HookContext,
  runContext: RunContext
) => RunContext;

export type OnConfigLoadedHook = (
  context: HookContext,
  config: ConfigResolved
) => ConfigResolved;

export type OnResourceLoadedHook = (
  context: HookContext,
  resource: ContextResourceResolved
) => ContextResourceResolved;

export type OnRenderedHook = (
  context: HookContext,
  artifacts: ArtifactResourceResolved[]
) => ArtifactResourceResolved[];

export type OnPlannedHook = (
  context: HookContext,
  plans: PlanResourceResolved[]
) => PlanResourceResolved[];

export type OnAppliedHook = (
  context: HookContext,
  results: ResultResourceManifest[]
) => void;

export type OnFinalizedHook = (context: HookContext) => void;

export type OnReportedHook = (
  context: HookContext,
  reports: ReportResourceManifest[]
) => void;

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

export type ConfigHookManifest = Readonly<ConfigHookResolved>;
