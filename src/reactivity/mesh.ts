/** @fileoverview Provides the mesh function for the vistavia reactivity system.
 *
 * The mesh function is a wrapper around the Proxy object that allows for reactive state management.
 *
 * @author Khaled Nadam
 * @created 2025-10-17
 */

import { track, trigger } from "./effect.ts";

export const mesh = <T extends object>(target: T): T => {
  return new Proxy(target, {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver);
      track(target, key as string);
      // Only wrap objects with mesh, return primitives as-is
      return (value && typeof value === 'object') ? mesh(value) : value;
    },

    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      trigger(target, key as string);
      return result;
    },
  });
};
