/** @fileoverview Provides the binding functions for the vistavia dom bindings system.
 *
 * The binding functions are used to bind reactive data to the DOM.
 *
 * @author Khaled Nadam
 * @created 2025-10-19
 */

import { effect } from "../reactivity/effect";

export const bindText = (node: HTMLElement, getter: () => any) => {
  const eff = effect(() => {
    node.textContent = getter();
  });
  return () => {
    eff.stop();
    node = null as unknown as HTMLElement;
  };
};

export const bindEvent = (
  element: HTMLElement,
  eventName: string,
  handler: () => any
) => {
  let currentHandler = handler();

  const wrapper = (event: Event) => {
    if (!currentHandler) return;

    if (typeof currentHandler === "function") {
      currentHandler(event);
    } else {
      currentHandler.handleEvent(event);
    }
  };

  element.addEventListener(eventName, wrapper);

  const eff = effect(() => {
    currentHandler = handler();
  });

  return () => {
    eff.stop();
    element.removeEventListener(eventName, wrapper);
  };
};

/**
 * TODO: Bind Attributes
 * TODO: Bind Styles
 */
