let activeEffect = null;

class ReactiveEff {
  private fn: () => any;
  private deps: Set<ReactiveEff>;
  private active: boolean;
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

const targetMap = new WeakMap();

/**
 * Collect reactive object deps
 * @param target The reactive object
 * @param key The property of the reactive object
 */
const track = (target: any, key: string) => {};

/**
 * Re-run effects that depend on the reactive object
 * @param target The reactive object
 * @param key The property of the reactive object
 */
const trigger = (target: any, key: string) => {};
