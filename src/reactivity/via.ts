/**
 * @fileoverview Provides reactive state management utilities for the vistavia reactivity system.
 * 
 * Defines the core primitives used for dependency tracking and reactivity:
 * - `via()` for reactive values
 * 
 * The design follows a dependency graph model inspired by Vue 3’s reactivity system.
 * 
 * @author Khaled
 * @created 2025-10-16
 */


import { track, trigger } from "./effect.ts";

class ViaImpl<T> {
  private _v: T;
  constructor(_v: T) {
    this._v = _v;
  }
  get v() {
    track(this, "_v");
    return this._v;
  }
  set v(_v: T) {
    if (_v === this._v) return;
    this._v = _v;
    trigger(this, "_v");
  }

  public valueOf() {
    return this._v;
  }
}

/**
 * Create a via
 * @param v The value to wrap
 * @returns A reactive value
 */
export const via = <T>(v: T) => {
  return new ViaImpl(v);
};
