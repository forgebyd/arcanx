import type { Brand } from '../utilities/helper.js';

/**
 * A branded string representing the cache resolution strategy.
 * This type is used to ensure type safety when working with cache resolution strategies.
 *
 * @see {@link ConfigStrategySpec}
 * @see {@link ConfigStrategyResolved}
 * @see {@link ConfigStrategyManifest}
 *
 * @category Loader
 */
export type CacheResolutionStrategy = Brand<
  'memory' | 'filesystem' | 'none',
  'CacheResolutionStrategy'
>;

/**
 * A branded string representing the conflict resolution strategy.
 * This type is used to ensure type safety when working
 * with conflict resolution strategies.
 *
 * @see {@link ConfigStrategySpec}
 * @see {@link ConfigStrategyResolved}
 * @see {@link ConfigStrategyManifest}
 *
 * @category Loader
 */
export type ConflictResolutionStrategy = Brand<
  'abort' | 'ask' | 'overwrite' | 'skip',
  'ConflictResolutionStrategy'
>;

/**
 * A branded string representing the error resolution strategy.
 * This type is used to ensure type safety when working
 * with error resolution strategies.
 *
 * @see {@link ConfigStrategySpec}
 * @see {@link ConfigStrategyResolved}
 * @see {@link ConfigStrategyManifest}
 *
 * @category Loader
 */
export type ErrorResolutionStrategy = Brand<
  'abort' | 'skip',
  'ErrorResolutionStrategy'
>;

/**
 * A type representing the specification of a configuration strategy.
 * This type is used to ensure type safety when working with configuration strategies.
 *
 * @category Loader
 */
export type ConfigStrategySpec = {
  cacheResolution?: CacheResolutionStrategy;
  conflictResolution?: ConflictResolutionStrategy;
  errorResolution?: ErrorResolutionStrategy;
};

/**
 * A type representing the resolved representation of a configuration strategy.
 * This type is used to ensure type safety when working with configuration strategies.
 *
 * @category Loader
 */
export type ConfigStrategyResolved = {
  cacheResolution: CacheResolutionStrategy;
  conflictResolution: ConflictResolutionStrategy;
  errorResolution: ErrorResolutionStrategy;
};

/**
 * A type representing the manifest of a configuration strategy.
 * This type is used to ensure type safety when working with configuration strategies.
 *
 * @category Loader
 */
export type ConfigStrategyManifest = Readonly<ConfigStrategyResolved>;
