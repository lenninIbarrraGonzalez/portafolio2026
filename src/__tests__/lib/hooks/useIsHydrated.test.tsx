import { renderHook } from '@testing-library/react';
import { useIsHydrated } from '@/lib/hooks/useIsHydrated';

describe('useIsHydrated', () => {
  it('returns true after hydration in a client render', () => {
    const { result } = renderHook(() => useIsHydrated());
    // In jsdom (client) the store snapshot resolves to true.
    expect(result.current).toBe(true);
  });

  it('stays stable across re-renders', () => {
    const { result, rerender } = renderHook(() => useIsHydrated());
    rerender();
    expect(result.current).toBe(true);
  });
});
