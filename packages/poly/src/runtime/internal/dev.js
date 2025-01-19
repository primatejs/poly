import {
  custom_event,
  append,
  append_hydration,
  insert,
  insert_hydration,
  detach,
  listen,
  attr,
} from "./dom.js";
import { PolyComponent } from "./Component.js";
import { is_void } from "../../shared/utils/names.js";
import { VERSION } from "#version";
import { contenteditable_truthy_values } from "./utils.js";
import { ensure_array_like } from "./each.js";

/**
 * @template T
 * @param {string} type
 * @param {T} [detail]
 * @returns {void}
 */
export function dispatch_dev(type, detail) {
  document.dispatchEvent(custom_event(type, { version: VERSION, ...detail }, { bubbles: true }));
}

/**
 * @param {Node} target
 * @param {Node} node
 * @returns {void}
 */
export function append_dev(target, node) {
  dispatch_dev("PolyDOMInsert", { target, node });
  append(target, node);
}

/**
 * @param {Node} target
 * @param {Node} node
 * @returns {void}
 */
export function append_hydration_dev(target, node) {
  dispatch_dev("PolyDOMInsert", { target, node });
  append_hydration(target, node);
}

/**
 * @param {Node} target
 * @param {Node} node
 * @param {Node} [anchor]
 * @returns {void}
 */
export function insert_dev(target, node, anchor) {
  dispatch_dev("PolyDOMInsert", { target, node, anchor });
  insert(target, node, anchor);
}

// @param {Node} target
// @param {Node} node
// @param {Node} [anchor]
// @returns {void}
//
export function insert_hydration_dev(target, node, anchor) {
  dispatch_dev("PolyDOMInsert", { target, node, anchor });
  insert_hydration(target, node, anchor);
}

/**
 * @param {Node} node
 * @returns {void}
 */
export function detach_dev(node) {
  dispatch_dev("PolyDOMRemove", { node });
  detach(node);
}

/**
 * @param {Node} before
 * @param {Node} after
 * @returns {void}
 */
export function detach_between_dev(before, after) {
  while (before.nextSibling && before.nextSibling !== after) {
    detach_dev(before.nextSibling);
  }
}

/**
 * @param {Node} after
 * @returns {void}
 */
export function detach_before_dev(after) {
  while (after.previousSibling) {
    detach_dev(after.previousSibling);
  }
}

/**
 * @param {Node} before
 * @returns {void}
 */
export function detach_after_dev(before) {
  while (before.nextSibling) {
    detach_dev(before.nextSibling);
  }
}

/**
 * @param {Node} node
 * @param {string} event
 * @param {EventListenerOrEventListenerObject} handler
 * @param {boolean | AddEventListenerOptions | EventListenerOptions} [options]
 * @param {boolean} [has_prevent_default]
 * @param {boolean} [has_stop_propagation]
 * @param {boolean} [has_stop_immediate_propagation]
 * @returns {() => void}
 */
export function listen_dev(
  node,
  event,
  handler,
  options,
  has_prevent_default,
  has_stop_propagation,
  has_stop_immediate_propagation,
) {
  const modifiers =
    options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
  if (has_prevent_default) {
    modifiers.push("preventDefault");
  }
  if (has_stop_propagation) {
    modifiers.push("stopPropagation");
  }
  if (has_stop_immediate_propagation) {
    modifiers.push("stopImmediatePropagation");
  }
  dispatch_dev("PolyDOMAddEventListener", { node, event, handler, modifiers });
  const dispose = listen(node, event, handler, options);
  return () => {
    dispatch_dev("PolyDOMRemoveEventListener", { node, event, handler, modifiers });
    dispose();
  };
}

/**
 * @param {Element} node
 * @param {string} attribute
 * @param {string} [value]
 * @returns {void}
 */
export function attr_dev(node, attribute, value) {
  attr(node, attribute, value);
  if (value == null) {
    dispatch_dev("PolyDOMRemoveAttribute", { node, attribute });
  } else {
    dispatch_dev("PolyDOMSetAttribute", { node, attribute, value });
  }
}

/**
 * @param {Element} node
 * @param {string} property
 * @param {any} [value]
 * @returns {void}
 */
export function prop_dev(node, property, value) {
  node[property] = value;
  dispatch_dev("PolyDOMSetProperty", { node, property, value });
}

/**
 * @param {HTMLElement} node
 * @param {string} property
 * @param {any} [value]
 * @returns {void}
 */
export function dataset_dev(node, property, value) {
  node.dataset[property] = value;
  dispatch_dev("PolyDOMSetDataset", { node, property, value });
}

/**
 * @param {Text} text
 * @param {unknown} data
 * @returns {void}
 */
export function set_data_dev(text, data) {
  data = `${ data}`;
  if (text.data === data) {
    return;
  }
  dispatch_dev("PolyDOMSetData", { node: text, data });
  text.data = /** @type {string} */ data;
}

/**
 * @param {Text} text
 * @param {unknown} data
 * @returns {void}
 */
export function set_data_contenteditable_dev(text, data) {
  data = `${ data}`;
  if (text.wholeText === data) {
    return;
  }
  dispatch_dev("PolyDOMSetData", { node: text, data });
  text.data = /** @type {string} */ data;
}

/**
 * @param {Text} text
 * @param {unknown} data
 * @param {string} attr_value
 * @returns {void}
 */
export function set_data_maybe_contenteditable_dev(text, data, attr_value) {
  if (~contenteditable_truthy_values.indexOf(attr_value)) {
    set_data_contenteditable_dev(text, data);
  } else {
    set_data_dev(text, data);
  }
}

export function ensure_array_like_dev(arg) {
  if (
    typeof arg !== "string" &&
    !(arg && typeof arg === "object" && "length" in arg) &&
    !(typeof Symbol === "function" && arg && Symbol.iterator in arg)
  ) {
    throw new Error("{#each} only works with iterable values.");
  }
  return ensure_array_like(arg);
}

//
// @returns {void}
export function validate_slots(name, slot, keys) {
  for (const slot_key of Object.keys(slot)) {
    if (!~keys.indexOf(slot_key)) {
      console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
    }
  }
}

/**
 * @param {unknown} tag
 * @returns {void}
 */
export function validate_dynamic_element(tag) {
  const is_string = typeof tag === "string";
  if (tag && !is_string) {
    throw new Error("<svelte:element> expects \"this\" attribute to be a string.");
  }
}

/**
 * @param {undefined | string} tag
 * @returns {void}
 */
export function validate_void_dynamic_element(tag) {
  if (tag && is_void(tag)) {
    console.warn(`<svelte:element this="${tag}"> is self-closing and cannot have content.`);
  }
}

export function construct_poly_component_dev(component, props) {
  const error_message = "this={...} of <svelte:component> should specify a Poly component.";
  try {
    const instance = new component(props);
    if (!instance.$$ || !instance.$set || !instance.$on || !instance.$destroy) {
      throw new Error(error_message);
    }
    return instance;
  } catch (err) {
    const { message } = err;
    if (typeof message === "string" && message.indexOf("is not a constructor") !== -1) {
      throw new Error(error_message);
    } else {
      throw err;
    }
  }
}

/**
 * Base class for Poly components with some minor dev-enhancements. Used when dev=true.
 *
 * Can be used to create strongly typed Poly components.
 *
 * #### Example:
 *
 * You have component library on npm called `component-library`, from which
 * you export a component called `MyComponent`. For Poly+TypeScript users,
 * you want to provide typings. Therefore you create a `index.d.ts`:
 * ```ts
 * import { PolyComponent } from "poly";
 * export class MyComponent extends PolyComponent<{foo: string}> {}
 * ```
 * Typing this makes it possible for IDEs like VS Code with the Poly extension
 * to provide intellisense and to use the component like this in a Poly file
 * with TypeScript:
 * ```poly
 * <script lang="ts">
 *   import { MyComponent } from "component-library";
 * </script>
 * <MyComponent foo={'bar'} />
 * ```
 * @template {Record<string, any>} [Props=any]
 * @template {Record<string, any>} [Events=any]
 * @template {Record<string, any>} [Slots=any]
 * @extends {PolyComponent<Props, Events>}
 */
export class PolyComponentDev extends PolyComponent {
  /**
   * For type checking capabilities only.
   * Does not exist at runtime.
   * ### DO NOT USE!
   *
   * @type {Props}
   */
  $$prop_def;
  /**
   * For type checking capabilities only.
   * Does not exist at runtime.
   * ### DO NOT USE!
   *
   * @type {Events}
   */
  $$events_def;
  /**
   * For type checking capabilities only.
   * Does not exist at runtime.
   * ### DO NOT USE!
   *
   * @type {Slots}
   */
  $$slot_def;

  /** @param {import('./public.js').ComponentConstructorOptions<Props>} options */
  constructor(options) {
    if (!options || !options.target && !options.$$inline) {
      throw new Error("'target' is a required option");
    }
    super();
  }

  /** @returns {void} */
  $destroy() {
    super.$destroy();
    this.$destroy = () => {
      console.warn("Component was already destroyed"); // eslint-disable-line no-console
    };
  }

  /** @returns {void} */
  $capture_state() {}

  /** @returns {void} */
  $inject_state() {}
}
/**
 * @template {Record<string, any>} [Props=any]
 * @template {Record<string, any>} [Events=any]
 * @template {Record<string, any>} [Slots=any]
 * @deprecated Use `PolyComponent` instead. See PR for more information: https://github.com/polyjs/poly/pull/8512
 * @extends {PolyComponentDev<Props, Events, Slots>}
 */
export class PolyComponentTyped extends PolyComponentDev {}

/** @returns {() => void} */
export function loop_guard(timeout) {
  const start = Date.now();
  return () => {
    if (Date.now() - start > timeout) {
      throw new Error("Infinite loop detected");
    }
  };
}
