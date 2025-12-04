import _has from 'lodash.has';
import _transform from 'lodash.transform';

/**
 * Recursively freezes all properties of an object.
 * This function will freeze all enumerable own properties of the object and then recursively call itself on all nested objects.
 *
 * @template TObj - The type of the object to freeze.
 * @param obj - The object to freeze.
 *
 * @returns The frozen object.
 *
 * @example
 * ```ts
 * const frozenObj = objFreeze({
 *   foo: {
 *     bar: {
 *       baz: { qux: 1 }
 *     }
 *   }
 * });
 * ```
 *
 * @category Utility.Object
 */
export const objFreeze = <TObj>(obj: TObj): TObj => {
  const props = Object.getOwnPropertyNames(obj);

  for (const prop of props) {
    // biome-ignore lint/suspicious/noExplicitAny: object manipulation
    const propValue = (obj as any)[prop];

    if (typeof propValue === 'object' && !Object.isFrozen(propValue)) {
      objFreeze(propValue);
    }
  }

  return Object.freeze(obj);
};

/**
 * Checks if an object has a given property.
 * This function will check if an object has a given property, regardless of whether it is an own property or an inherited one.
 *
 * @template TObj - The type of the object to check.
 * @param obj - The object to check.
 * @param prop - The property to check.
 *
 * @returns True if the object has the property, false otherwise.
 *
 * @see https://lodash.com/docs/4.17.15#has
 * @example
 * ```ts
 * if (objHas({ foo: 'bar' }, 'foo')) {
 *   // do something
 * }
 * ```
 *
 * @category Utility.Object
 */
export const objHas = <TObj>(obj: TObj, prop: string): boolean => {
  return _has(obj, prop);
};

/**
 * Transforms an object.
 * This function will transform an object by applying a function to each property of the object.
 *
 * @template TObj - The type of the object to transform.
 * @param obj - The object to transform.
 * @param iteratee - The function to apply to each property of the object.
 * @param accumulator - The accumulator object.
 *
 * @returns The transformed object.
 *
 * @see https://lodash.com/docs/4.17.15#transform
 * @example
 * ```ts
 * const transformedObj = objTransform(
 *   { foo: 'bar' },
 *   (result, value, key) => {
 *     result[key] = value.toUpperCase();
 *   }
 * );
 * ```
 *
 * @category Utility.Object
 */
export const objTransform: typeof _transform = _transform;
