import { useCallback, useRef, useSyncExternalStore } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';

export interface CarouselSelection {
  selectedIndex: number;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

const DEFAULT_SELECTION: CarouselSelection = {
  selectedIndex: 0,
  canScrollPrev: false,
  canScrollNext: false,
};

/**
 * Subscribes to an Embla carousel's selection state (`select`/`reInit` events)
 * and exposes the current index plus scroll availability.
 *
 * Embla is an imperative external store, so this uses `useSyncExternalStore` —
 * the compiler-approved primitive for subscribing to external state — instead
 * of syncing via `setState` inside an effect.
 */
export function useCarouselSelection(
  emblaApi: EmblaCarouselType | undefined
): CarouselSelection {
  // Cache the snapshot so getSnapshot returns a stable reference between
  // events; useSyncExternalStore requires this to avoid render loops.
  const cacheRef = useRef<CarouselSelection>(DEFAULT_SELECTION);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!emblaApi) return () => {};
      emblaApi.on('select', onStoreChange).on('reInit', onStoreChange);
      return () => {
        emblaApi.off('select', onStoreChange).off('reInit', onStoreChange);
      };
    },
    [emblaApi]
  );

  const getSnapshot = useCallback((): CarouselSelection => {
    if (!emblaApi) return DEFAULT_SELECTION;

    const previous = cacheRef.current;
    const next: CarouselSelection = {
      selectedIndex: emblaApi.selectedScrollSnap(),
      canScrollPrev: emblaApi.canScrollPrev(),
      canScrollNext: emblaApi.canScrollNext(),
    };

    if (
      previous.selectedIndex === next.selectedIndex &&
      previous.canScrollPrev === next.canScrollPrev &&
      previous.canScrollNext === next.canScrollNext
    ) {
      return previous;
    }

    cacheRef.current = next;
    return next;
  }, [emblaApi]);

  return useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_SELECTION);
}
