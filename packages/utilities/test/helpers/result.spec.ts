import type { Failure, Success } from '@arcanx/types';

import { describe, expect, expectTypeOf, it, vi } from 'vitest';

import {
  attemptAsync,
  attemptSync,
  failure,
  success,
} from '../../source/helpers/result.js';

describe('result helper', () => {
  describe('attemptAsync', () => {
    it('should return a successful response correctly', async () => {
      // biome-ignore lint/suspicious/useAwait: expect not to use await
      const callback = vi.fn(async () => {
        return {
          message: 'Operation Succeeded',
        };
      });

      const res = (await attemptAsync(callback)) as Success<{
        message: string;
      }>;

      expect(callback).toHaveBeenCalledOnce();

      expect(res.isSuccess).toBe(true);
      expect(res.data).toStrictEqual({
        message: 'Operation Succeeded',
      });
    });

    it('should return a failure response correctly', async () => {
      // biome-ignore lint/suspicious/useAwait: expect not to use await
      const callback = vi.fn(async () => {
        throw new Error('Operation Failed');
      });

      const res = (await attemptAsync(callback)) as Failure<Error>;

      expect(callback).toHaveBeenCalledOnce();
      expect(callback).rejects.toThrowError();

      expect(res.isSuccess).toBe(false);
      expect(res.error).toBeInstanceOf(Error);
    });
  });

  describe('attemptSync', () => {
    it('should return a successful response correctly', () => {
      const callback = vi.fn(() => {
        return {
          message: 'Operation Succeeded',
        };
      });

      const res = attemptSync(callback) as Success<{
        message: string;
      }>;

      expect(callback).toHaveBeenCalledOnce();

      expect(res.isSuccess).toBe(true);
      expect(res.data).toStrictEqual({
        message: 'Operation Succeeded',
      });
    });

    it('should return a failure response correctly', () => {
      const callback = vi.fn(() => {
        throw new Error('Operation Failed');
      });

      const res = attemptSync(callback) as Failure<Error>;

      expect(callback).toHaveBeenCalledOnce();
      expect(callback).toThrowError();

      expect(res.isSuccess).toBe(false);
      expect(res.error).toBeInstanceOf(Error);
    });

    it('should throw an error if the callback is a promise', () => {
      const res = attemptSync(
        Promise.resolve({
          message: 'Operation Succeeded',
          // biome-ignore lint/suspicious/noExplicitAny: expect to use any
        }) as any
      ) as Failure<Error>;

      expect(res.isSuccess).toBe(false);
      expect(res.error).toBeInstanceOf(Error);
      expect(res.error.message).toBe(
        'Given callback cannot be a promise instance.'
      );
    });

    it('should throw an error if the callback is an async function', () => {
      // biome-ignore lint/suspicious/useAwait: expect not to use await
      const res = attemptSync(async () => {
        return {
          message: 'Operation Should Fail',
        };
      }) as Failure<Error>;

      expect(res.isSuccess).toBe(false);
      expect(res.error).toBeInstanceOf(Error);
      expect(res.error.message).toBe(
        'Given callback cannot be a promise instance.'
      );
    });
  });

  describe('failure', () => {
    it('should run correctly and successfully', () => {
      const err = new Error('Operation Failed');
      const res = failure(err);

      expectTypeOf(res).toEqualTypeOf<Failure<Error>>();

      expect(failure).not.toThrowError();

      expect(res.isSuccess).toBe(false);
      expect(res.error).toBe(err);

      // @ts-expect-error
      expect(res.data).not.toBeDefined();
    });

    it('should run with any type of error', () => {
      const errBase = new Error('Operation Failed');
      const errType = new TypeError('Operation Failed');

      const resBase = failure(errBase);
      const resType = failure(errType);

      expectTypeOf(resBase).toEqualTypeOf<Failure<Error>>();
      expectTypeOf(resType).toEqualTypeOf<Failure<TypeError>>();

      expect(resBase.error).toBeInstanceOf(Error);
      expect(resType.error).toBeInstanceOf(TypeError);
    });
  });

  describe('success', () => {
    it('should run correctly and successfully', () => {
      const res = success({
        message: 'Operation Succeeded',
      });

      expectTypeOf(res).toEqualTypeOf<
        Success<{
          message: string;
        }>
      >();

      expect(success).not.toThrowError();

      expect(res.isSuccess).toBe(true);
      expect(res.data).toStrictEqual({
        message: 'Operation Succeeded',
      });

      // @ts-expect-error
      expect(res.error).not.toBeDefined();
    });

    it('should run with any type of data', () => {
      const resBoolean = success(true);
      const resNumber = success(1);
      const resString = success('Operation Succeeded');
      const resObject = success({
        message: 'Operation Succeeded',
      });

      expectTypeOf(resBoolean).toEqualTypeOf<Success<boolean>>();
      expectTypeOf(resNumber).toEqualTypeOf<Success<number>>();
      expectTypeOf(resString).toEqualTypeOf<Success<string>>();
      expectTypeOf(resObject).toEqualTypeOf<Success<{ message: string }>>();

      expect(resBoolean.data).toBeTypeOf('boolean');
      expect(resNumber.data).toBeTypeOf('number');
      expect(resString.data).toBeTypeOf('string');
      expect(resObject.data).toBeTypeOf('object');
    });
  });
});
