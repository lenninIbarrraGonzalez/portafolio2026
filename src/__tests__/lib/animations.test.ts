import {
  fadeInUp,
  slideInFromLeft,
  slideInFromRight,
  staggerContainer,
  staggerContainerSlow,
  staggerContainerFast,
} from '@/lib/animations';

describe('Animation Variants', () => {
  describe('fadeInUp', () => {
    it('has hidden state with opacity 0 and y offset', () => {
      expect(fadeInUp.hidden).toEqual({ opacity: 0, y: 20 });
    });

    it('has visible state with full opacity and no offset', () => {
      expect(fadeInUp.visible).toMatchObject({ opacity: 1, y: 0 });
    });

    it('has transition duration in visible state', () => {
      const visible = fadeInUp.visible as { transition: { duration: number } };
      expect(visible.transition.duration).toBe(0.5);
    });
  });

  describe('slideInFromLeft', () => {
    it('has hidden state with negative x offset', () => {
      expect(slideInFromLeft.hidden).toEqual({ opacity: 0, x: -50 });
    });

    it('has visible state centered', () => {
      expect(slideInFromLeft.visible).toMatchObject({ opacity: 1, x: 0 });
    });

    it('has correct transition duration', () => {
      const visible = slideInFromLeft.visible as { transition: { duration: number } };
      expect(visible.transition.duration).toBe(0.6);
    });
  });

  describe('slideInFromRight', () => {
    it('has hidden state with positive x offset', () => {
      expect(slideInFromRight.hidden).toEqual({ opacity: 0, x: 50 });
    });

    it('has visible state centered', () => {
      expect(slideInFromRight.visible).toMatchObject({ opacity: 1, x: 0 });
    });
  });

  describe('staggerContainer', () => {
    it('has hidden state with opacity 0', () => {
      expect(staggerContainer.hidden).toEqual({ opacity: 0 });
    });

    it('has staggerChildren in visible transition', () => {
      const visible = staggerContainer.visible as { transition: { staggerChildren: number } };
      expect(visible.transition.staggerChildren).toBe(0.1);
    });
  });

  describe('staggerContainerSlow', () => {
    it('has slower staggerChildren value', () => {
      const visible = staggerContainerSlow.visible as { transition: { staggerChildren: number } };
      expect(visible.transition.staggerChildren).toBe(0.2);
    });
  });

  describe('staggerContainerFast', () => {
    it('has staggerChildren value', () => {
      const visible = staggerContainerFast.visible as { transition: { staggerChildren: number } };
      expect(visible.transition.staggerChildren).toBe(0.15);
    });

    it('has delayChildren value', () => {
      const visible = staggerContainerFast.visible as { transition: { delayChildren: number } };
      expect(visible.transition.delayChildren).toBe(0.3);
    });
  });
});
