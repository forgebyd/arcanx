import type {
  TemplateEngineConfigManifest,
  TemplateEngineConfigResolved,
  TemplateEngineConfigSpec,
} from '../renderer/engine.js';
import type { CacheTTL } from '../utilities/cache.js';
import type { AbsolutePath } from '../utilities/path.js';
import type {
  ConfigHookManifest,
  ConfigHookResolved,
  ConfigHookSpec,
} from './config-hook.js';
import type {
  ConfigStrategyManifest,
  ConfigStrategyResolved,
  ConfigStrategySpec,
} from './config-strategy.js';

/**
 * A type representing the specification of a configuration.
 * This type is used to ensure type safety when working with configurations.
 *
 * @category Loader.Config
 */
export type ConfigSpec = {
  behavior?: {
    dry?: boolean;
    verbose?: boolean;
    confirmBeforeDelete?: boolean;
    confirmBeforeRun?: boolean;
  };
  cache?: {
    enabled?: boolean;
    ttl?: number;
  };
  path?: {
    cwd?: string;
    cache?: string;
    project?: string;
    actions?: string;
    generators?: string;
    rendererHelpers?: string;
    rendererPartials?: string;
    templates?: string;
  };
  strategy?: ConfigStrategySpec;
  template?: TemplateEngineConfigSpec;
  hooks?: ConfigHookSpec;
};

/**
 * A type representing the resolved representation of a configuration.
 * This type is used to ensure type safety when working with configurations.
 *
 * @category Loader.Config
 */
export type ConfigResolved = {
  behavior: {
    dry: boolean;
    verbose: boolean;
    confirmBeforeDelete: boolean;
    confirmBeforeRun: boolean;
  };
  cache: {
    enabled: boolean;
    ttl: CacheTTL;
  };
  path: {
    cwd: AbsolutePath;
    cache: AbsolutePath;
    project: AbsolutePath;
    actions: AbsolutePath;
    generators: AbsolutePath;
    rendererHelpers: AbsolutePath;
    rendererPartials: AbsolutePath;
    templates: AbsolutePath;
  };
  strategy: ConfigStrategyResolved;
  template: TemplateEngineConfigResolved;
  hooks: ConfigHookResolved;
};

/**
 * A type representing the manifest of a configuration.
 * This type is used to ensure type safety when working with configurations.
 *
 * @category Loader.Config
 */
export type ConfigManifest = Readonly<{
  behavior: Readonly<ConfigResolved['behavior']>;
  cache: Readonly<ConfigResolved['cache']>;
  path: Readonly<ConfigResolved['path']>;
  strategy: ConfigStrategyManifest;
  template: TemplateEngineConfigManifest;
  hooks: ConfigHookManifest;
}>;
