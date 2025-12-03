import nodePath from 'node:path';

import type { AbsolutePath, RelativePath } from '@arcanx/types';

import { describe, expect, expectTypeOf, it, vi } from 'vitest';

import {
  asAbsolutePath,
  asRelativePath,
  isAbsolutePath,
  isRelativePath,
} from '../../source/helpers/path.js';

const segments = [
  process.cwd(),
  'packages',
  'utilities',
  'test',
  'helpers',
  'path.spec.ts',
];

describe('path helper', () => {
  describe('asAbsolutePath', () => {
    it('should run correctly', () => {
      const resolve = vi.spyOn(nodePath, 'resolve');

      const expectedPath = nodePath.resolve(...segments);
      const actualPath = asAbsolutePath(...segments);

      expect(resolve).toHaveBeenCalled();
      expect(resolve).toHaveBeenCalledWith(...segments);

      expectTypeOf(actualPath).toEqualTypeOf<AbsolutePath>();

      expect(actualPath).toBe(expectedPath);
      expect(nodePath.isAbsolute(actualPath)).toBe(true);

      resolve.mockRestore();
    });

    it('should run correctly with absolute path', () => {
      const expectedPath = nodePath.resolve('test', 'helpers', 'path.spec.ts');
      const actualPath = asAbsolutePath(expectedPath);

      expect(actualPath).toBe(expectedPath);
    });

    it('should run correctly with mixed path', () => {
      const segments = [
        asAbsolutePath(process.cwd(), 'packages', 'utilities'),
        'source',
        asRelativePath('./source', 'test', 'helpers', 'path.spec.ts'),
      ];

      const expectedPath = nodePath.resolve(...segments);
      const actualPath = asAbsolutePath(...segments);

      expect(actualPath).toBe(expectedPath);
    });
  });
  describe('asRelativePath', () => {
    it('should run correctly', () => {
      const relative = vi.spyOn(nodePath, 'relative');
      const resolve = vi.spyOn(nodePath, 'resolve');

      const expectedPath = nodePath.relative(
        './source',
        nodePath.join(...segments.slice(3))
      );
      const actualPath = asRelativePath('./source', ...segments.slice(3));

      expect(relative).toHaveBeenCalled();
      expect(relative).toHaveBeenCalledWith(
        './source',
        nodePath.resolve(...segments.slice(3))
      );

      expect(resolve).toHaveBeenCalled();
      expect(resolve).toHaveBeenCalledWith(...segments.slice(3));

      expectTypeOf(actualPath).toEqualTypeOf<RelativePath>();

      expect(actualPath).toBe(expectedPath);
      expect(nodePath.isAbsolute(actualPath)).toBe(false);

      relative.mockRestore();
      resolve.mockRestore();
    });

    it('should run correctly with relative path', () => {
      const expectedPath = nodePath.relative(
        './source',
        nodePath.join(...segments.slice(3))
      );
      const actualPath = asRelativePath('./source', ...segments.slice(3));

      expect(actualPath).toBe(expectedPath);
    });

    it('should run correctly with mixed path', () => {
      const segments = [
        asAbsolutePath(process.cwd(), 'packages', 'utilities'),
        'source',
        asRelativePath('./source', 'test', 'helpers', 'path.spec.ts'),
      ];

      const expectedPath = nodePath.relative(
        segments[0],
        nodePath.join(...segments.slice(1))
      );
      const actualPath = asRelativePath(segments[0], ...segments.slice(1));

      expect(actualPath).toBe(expectedPath);
    });
  });

  describe('isAbsolutePath', () => {
    it('should run correctly', () => {
      const actualPathWithAbsPath = asAbsolutePath(...segments);
      const actualPathWithNodeAbsPath = nodePath.resolve(...segments);

      expect(isAbsolutePath(actualPathWithAbsPath)).toBe(true);
      expect(isAbsolutePath(actualPathWithNodeAbsPath)).toBe(true);
    });

    it('should run correctly with non-absolute path', () => {
      const relativePathWithRelPath = asRelativePath(
        segments[0],
        ...segments.slice(1)
      );
      const relativePathWithNodeRelPath = nodePath.relative(
        segments[0],
        nodePath.join(...segments.slice(1))
      );

      expect(isAbsolutePath(relativePathWithRelPath)).toBe(false);
      expect(isAbsolutePath(relativePathWithNodeRelPath)).toBe(false);
    });
  });

  describe('isRelativePath', () => {
    it('should run correctly', () => {
      const relativePathWithRelPath = asRelativePath(
        segments[0],
        ...segments.slice(1)
      );
      const relativePathWithNodeRelPath = nodePath.relative(
        segments[0],
        nodePath.join(...segments.slice(1))
      );

      expect(isRelativePath(relativePathWithRelPath)).toBe(true);
      expect(isRelativePath(relativePathWithNodeRelPath)).toBe(true);
    });

    it('should run correctly with non-relative path', () => {
      const actualPathWithAbsPath = asAbsolutePath(...segments);
      const actualPathWithNodeAbsPath = nodePath.resolve(...segments);

      expect(isRelativePath(actualPathWithAbsPath)).toBe(false);
      expect(isRelativePath(actualPathWithNodeAbsPath)).toBe(false);
    });
  });
});
