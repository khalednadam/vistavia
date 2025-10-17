/**
 * @fileoverview Provides the core reactive effect system for the vistavia reactivity system.
 *
 * Defines the core primitives used for dependency tracking and reactivity:
 * - `effect()` for reactive effects
 *
 * The design follows a dependency graph model inspired by Vue 3’s reactivity system.
 *
 * @author Khaled Nadam
 * @created 2025-10-15
 */

// TODO: Remove logs
let activeEffect: ReactiveEff | null = null;

export class ReactiveEff {
  public fn: () => any;
  public deps: Set<ReactiveEff>;
  public active: boolean;
  constructor(fn: () => any) {
    this.fn = fn;
    this.deps = new Set();
    this.active = true;
  }
  start() {
    if (!this.active) {
      return this.fn();
    }
    activeEffect = this;
    this.fn();
    activeEffect = null;
  }
  stop() {
    if (!this.active) {
      return;
    }
    this.deps.forEach((dep) => dep.deps.delete(this));
    this.deps.clear();
    this.active = false;
  }
}

/**
 * Create a reactive effect
 * @param fn The function to execute when the effect is triggered
 * @returns
 */
export const effect = (fn: () => any) => {
  const reactiveEff = new ReactiveEff(fn);
  reactiveEff.start();
  return reactiveEff;
};

const targetMap = new WeakMap<Map<string, Set<ReactiveEff>>>();

/**
 * Collect reactive object deps
 * @param target The reactive object
 * @param key The property of the reactive object
 */
export const track = (target: any, key: string) => {
  if (!activeEffect || !activeEffect.active) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set<ReactiveEff>();
    depsMap.set(key, dep);
  }
  // console.log('dep', dep);
  // console.log('activeEffect', activeEffect);
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
    activeEffect.deps.add(dep);
  }
};

/**
 * Re-run effects that depend on the reactive object
 * @param target The reactive object
 * @param key The property of the reactive object
 */
export const trigger = (target: any, key: string) => {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  // console.log('depsMap', depsMap);
  let dep = depsMap.get(key);
  if (!dep) {
    return;
  }
  // console.log('dep', dep);
  dep.forEach((ef: ReactiveEff) => ef.start());
};
