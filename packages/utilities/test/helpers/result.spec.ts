import type { Failure, Success } from '@arcanx/types';
import { describe, expect, expectTypeOf, it, vi } from 'vitest';

import {
  attemptAsync,
  attemptSync,
  failure,
  success,
} from '../../source/helpers/result.js';

describe('Result Helper', () => {
  describe('attemptAsync', () => {
    it('should run failed correctly', async () => {
      const error = new Error('Operation Failed');

      // biome-ignore lint/suspicious/useAwait: test
      const callback = vi.fn(async () => {
        throw error;
      });

      const result = await attemptAsync(callback);

      expect(callback).toHaveBeenCalledOnce();
      await expect(callback).rejects.toThrowError(error);

      if (!result.isSuccess) {
        expectTypeOf(result).toEqualTypeOf<{
          isSuccess: false;
          error: Error;
        }>();

        expect(result).toStrictEqual({
          isSuccess: false,
          error,
        });
      }
    });

    it('should run succeeded correctly', async () => {
      // biome-ignore lint/suspicious/useAwait: test
      const callback = vi.fn(async () => {
        return {
          message: 'Operation Succeeded',
        };
      });

      const result = await attemptAsync(callback);

      expect(callback).toHaveBeenCalledOnce();

      if (result.isSuccess) {
        expectTypeOf(result).toEqualTypeOf<{
          isSuccess: true;
          data: {
            message: string;
          };
        }>();

        expect(result).toStrictEqual({
          isSuccess: true,
          data: {
            message: 'Operation Succeeded',
          },
        });
      }
    });
  });

  describe('attemptSync', () => {
    it('should run failed correctly', () => {
      const error = new Error('Operation Failed');
      const callback = vi.fn(() => {
        throw error;
      });

      const result = attemptSync(callback);

      expect(callback).toHaveBeenCalledOnce();
      expect(callback).toThrowError(error);

      if (!result.isSuccess) {
        expectTypeOf(result).toEqualTypeOf<{
          isSuccess: false;
          error: Error;
        }>();

        expect(result).toStrictEqual({
          isSuccess: false,
          error,
        });
      }
    });

    it('should run succeeded correctly', () => {
      const callback = vi.fn(() => ({
        message: 'Operation Succeeded',
      }));

      const result = attemptSync(callback);

      expect(callback).toHaveBeenCalledOnce();

      if (result.isSuccess) {
        expectTypeOf(result).toEqualTypeOf<{
          isSuccess: true;
          data: {
            message: string;
          };
        }>();

        expect(result).toStrictEqual({
          isSuccess: true,
          data: {
            message: 'Operation Succeeded',
          },
        });
      }
    });

    it('should throw error when passed an async callback', () => {
      const result = attemptSync(async () => ({
        message: 'Operation Should Fail',
      })) as { isSuccess: false; error: Error };

      // @ts-expect-error
      expect(result.data).not.toBeDefined();

      expect(result.isSuccess).toBe(false);
      expect(result.error).toStrictEqual(
        new Error('Given callback cannot be a promise instance.')
      );
    });
  });

  describe('failure', () => {
    it('should run correctly', () => {
      const error = new Error('Operation Failed');
      const result = failure(error);

      expectTypeOf(result).toEqualTypeOf<Failure<Error>>();

      expect(result).toStrictEqual({
        isSuccess: false,
        error,
      });

      // @ts-expect-error
      expect(result.data).not.toBeDefined();
    });
  });

  describe('success', () => {
    it('should run correctly', () => {
      const result = success({
        message: 'Operation Succeed',
      });

      expectTypeOf(result).toEqualTypeOf<
        Success<{
          message: string;
        }>
      >();

      expect(result).toStrictEqual({
        isSuccess: true,
        data: {
          message: 'Operation Succeed',
        },
      });

      // @ts-expect-error
      expect(result.error).not.toBeDefined();
    });
  });
});
