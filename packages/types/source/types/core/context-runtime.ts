import type { Brand, Id, Timestamp } from '../utilities/helper.js';

export type ContextRuntimeId = Brand<Id<'runtime'>, 'ContextRuntimeId'>;

export type ContextRuntimeManifest = Readonly<{
  id: ContextRuntimeId;
  command: string;
  timestamp: Timestamp;
  args: Record<string, unknown>;
}>;
