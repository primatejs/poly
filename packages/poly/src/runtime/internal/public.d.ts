import { PolyComponent } from './Component.js';
import { PolyComponentDev } from './dev.js';

export interface ComponentConstructorOptions<
  Props extends Record<string, any> = Record<string, any>
> {
  target: Element | Document | ShadowRoot;
  anchor?: Element;
  props?: Props;
  context?: Map<any, any>;
  hydrate?: boolean;
  intro?: boolean;
  $$inline?: boolean;
}

/**
 * Convenience type to get the events the given component expects. Example:
 * ```html
 * <script lang="ts">
 *    import type { ComponentEvents } from 'poly';
 *    import Component from './Component.poly';
 *
 *    function handleCloseEvent(event: ComponentEvents<Component>['close']) {
 *       console.log(event.detail);
 *    }
 * </script>
 *
 * <Component on:close={handleCloseEvent} />
 * ```
 */
export type ComponentEvents<Component extends PolyComponent> =
  Component extends PolyComponentDev<any, infer Events> ? Events : never;

/**
 * Convenience type to get the props the given component expects. Example:
 * ```html
 * <script lang="ts">
 *   import type { ComponentProps } from 'poly';
 *   import Component from './Component.poly';
 *
 *   const props: ComponentProps<Component> = { foo: 'bar' }; // Errors if these aren't the correct props
 * </script>
 * ```
 */
export type ComponentProps<Component extends PolyComponent> =
  Component extends PolyComponentDev<infer Props> ? Props : never;

/**
 * Convenience type to get the type of a Poly component. Useful for example in combination with
 * dynamic components using `<svelte:component>`.
 *
 * Example:
 * ```html
 * <script lang="ts">
 *   import type { ComponentType, PolyComponent } from 'poly';
 *   import Component1 from './Component1.poly';
 *   import Component2 from './Component2.poly';
 *
 *   const component: ComponentType = someLogic() ? Component1 : Component2;
 *   const componentOfCertainSubType: ComponentType<PolyComponent<{ needsThisProp: string }>> = someLogic() ? Component1 : Component2;
 * </script>
 *
 * <svelte:component this={component} />
 * <svelte:component this={componentOfCertainSubType} needsThisProp="hello" />
 * ```
 */
export type ComponentType<Component extends PolyComponentDev = PolyComponentDev> = (new (
  options: ComponentConstructorOptions<
    Component extends PolyComponentDev<infer Props> ? Props : Record<string, any>
  >
) => Component) & {
  /** The custom element version of the component. Only present if compiled with the `customElement` compiler option */
  element?: typeof HTMLElement;
};

export interface DispatchOptions {
  cancelable?: boolean;
}

export interface EventDispatcher<EventMap extends Record<string, any>> {
  // Implementation notes:
  // - undefined extends X instead of X extends undefined makes this work better with both strict and nonstrict mode
  // - | null | undefined is added for convenience, as they are equivalent for the custom event constructor (both result in a null detail)
  <Type extends keyof EventMap>(
    ...args: null extends EventMap[Type]
      ? [type: Type, parameter?: EventMap[Type] | null | undefined, options?: DispatchOptions]
      : undefined extends EventMap[Type]
      ? [type: Type, parameter?: EventMap[Type] | null | undefined, options?: DispatchOptions]
      : [type: Type, parameter: EventMap[Type], options?: DispatchOptions]
  ): boolean;
}
