import type { Brand } from '../utilities/helper.js';

export type CacheResolutionStrategy = Brand<
  'memory' | 'filesystem' | 'none',
  'CacheResolutionStrategy'
>;

export type ConflictResolutionStrategy = Brand<
  'abort' | 'ask' | 'overwrite' | 'skip',
  'ConflictResolutionStrategy'
>;

export type ErrorResolutionStrategy = Brand<
  'abort' | 'skip',
  'ErrorResolutionStrategy'
>;

export type ConfigStrategySpec = {
  cacheResolution?: CacheResolutionStrategy;
  conflictResolution?: ConflictResolutionStrategy;
  errorResolution?: ErrorResolutionStrategy;
};

export type ConfigStrategyResolved = {
  cacheResolution: CacheResolutionStrategy;
  conflictResolution: ConflictResolutionStrategy;
  errorResolution: ErrorResolutionStrategy;
};

export type ConfigStrategyManifest = Readonly<ConfigStrategyResolved>;
