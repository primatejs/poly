import './ambient.js';

// Types written in this particular order to work around a dts-buddy bug where it doesn't handle the
// PolyComponentDev as PolyComponent alias correctly.
// If that's fixed, we  can do export * from './index.js' instead.

export {
  PolyComponent,
  PolyComponentTyped,
  onMount,
  onDestroy,
  beforeUpdate,
  afterUpdate,
  setContext,
  getContext,
  getAllContexts,
  hasContext,
  tick,
  createEventDispatcher
} from './index.js';

export type {
  ComponentConstructorOptions,
  ComponentEvents,
  ComponentProps,
  ComponentType
} from './internal/public.js';
