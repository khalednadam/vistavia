/** 
 * @fileoverview Provides the calc function for the vistavia reactivity system.
 * 
 * The calc function is a wrapper around the via function that allows for reactive calculations.
 * 
 * @author Khaled Nadam
 * @created 2025-10-16
 */

import { effect } from "./effect.ts";
import { via } from "./via.ts";

export const calc = (fn: () => any) => {
  const res = via(fn());
  effect(() => {
    res.v = fn();
  });
  return {
    get v() {
      return res.v;
    },
  };
};
