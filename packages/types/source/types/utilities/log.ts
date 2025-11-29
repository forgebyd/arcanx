import type { IDebug, IDebugger } from 'debug';
import type { Simplify } from 'type-fest';

export type IOLog = Simplify<
  {
    create: (namespace: string) => IDebugger;
  } & Pick<IDebug, 'coerce' | 'disable' | 'enable' | 'humanize' | 'log'>
>;
