import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

/**
 * Returns `false` during SSR and the first client render, then `true` once the
 * component has hydrated.
 *
 * Built on `useSyncExternalStore` so it stays compiler-safe and avoids the
 * `setState`-in-effect hydration pattern flagged by the React compiler.
 */
export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // client snapshot
    () => false // server snapshot
  );
}
