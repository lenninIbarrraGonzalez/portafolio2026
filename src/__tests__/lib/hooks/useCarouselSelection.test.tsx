import { act, renderHook } from '@testing-library/react';
import { useCarouselSelection } from '@/lib/hooks/useCarouselSelection';
import type { EmblaCarouselType } from 'embla-carousel';

interface FakeEmbla {
  api: EmblaCarouselType;
  emit: () => void;
  setState: (s: { index: number; prev: boolean; next: boolean }) => void;
  onSpy: jest.Mock;
  offSpy: jest.Mock;
}

function createFakeEmbla(): FakeEmbla {
  let state = { index: 0, prev: false, next: true };
  const listeners = new Set<() => void>();
  const onSpy = jest.fn();
  const offSpy = jest.fn();

  const api = {
    selectedScrollSnap: () => state.index,
    canScrollPrev: () => state.prev,
    canScrollNext: () => state.next,
    on: (_event: string, cb: () => void) => {
      onSpy(_event);
      listeners.add(cb);
      return api;
    },
    off: (_event: string, cb: () => void) => {
      offSpy(_event);
      listeners.delete(cb);
      return api;
    },
  } as unknown as EmblaCarouselType;

  return {
    api,
    emit: () => listeners.forEach((cb) => cb()),
    setState: (s) => {
      state = { index: s.index, prev: s.prev, next: s.next };
    },
    onSpy,
    offSpy,
  };
}

describe('useCarouselSelection', () => {
  it('returns the default selection when emblaApi is undefined', () => {
    const { result } = renderHook(() => useCarouselSelection(undefined));
    expect(result.current).toEqual({
      selectedIndex: 0,
      canScrollPrev: false,
      canScrollNext: false,
    });
  });

  it('reads the initial selection from the embla api', () => {
    const fake = createFakeEmbla();
    fake.setState({ index: 2, prev: true, next: false });
    const { result } = renderHook(() => useCarouselSelection(fake.api));
    expect(result.current).toEqual({
      selectedIndex: 2,
      canScrollPrev: true,
      canScrollNext: false,
    });
  });

  it('subscribes to select and reInit events', () => {
    const fake = createFakeEmbla();
    renderHook(() => useCarouselSelection(fake.api));
    expect(fake.onSpy).toHaveBeenCalledWith('select');
    expect(fake.onSpy).toHaveBeenCalledWith('reInit');
  });

  it('updates selection when an event fires', () => {
    const fake = createFakeEmbla();
    const { result } = renderHook(() => useCarouselSelection(fake.api));

    act(() => {
      fake.setState({ index: 1, prev: true, next: true });
      fake.emit();
    });

    expect(result.current.selectedIndex).toBe(1);
    expect(result.current.canScrollPrev).toBe(true);
  });

  it('unsubscribes on unmount', () => {
    const fake = createFakeEmbla();
    const { unmount } = renderHook(() => useCarouselSelection(fake.api));
    unmount();
    expect(fake.offSpy).toHaveBeenCalledWith('select');
    expect(fake.offSpy).toHaveBeenCalledWith('reInit');
  });
});
