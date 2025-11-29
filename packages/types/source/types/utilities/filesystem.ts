import type { Mode, OpenMode, PathLike, RmOptions } from 'node:fs';
import type { AbsolutePath, RelativePath } from './path.js';

export type IOReadFileDelegate = (
  path: AbsolutePath | RelativePath | PathLike,
  options?:
    | BufferEncoding
    | {
        encoding?: BufferEncoding;
        flag?: OpenMode;
      }
) => Promise<string>;

export type IOWriteFileDelegate = (
  path: AbsolutePath | RelativePath | PathLike,
  data: string,
  options?:
    | BufferEncoding
    | {
        encoding?: BufferEncoding;
        mode?: Mode;
        flag?: OpenMode;
        flush?: boolean;
      }
) => Promise<void>;

export type IORemoveFileDelegate = (
  path: AbsolutePath | RelativePath | PathLike,
  options?: RmOptions
) => Promise<void>;

export type IOIsDirExistsDelegate = (
  path: AbsolutePath | RelativePath | PathLike
) => Promise<boolean>;

export type IOIsFileExistsDelegate = (
  path: AbsolutePath | RelativePath | PathLike
) => Promise<boolean>;

export type IOFilesystem = {
  readFile: IOReadFileDelegate;
  writeFile: IOWriteFileDelegate;
  removeFile: IORemoveFileDelegate;
  isDirExists: IOIsDirExistsDelegate;
  isFileExists: IOIsFileExistsDelegate;
};
