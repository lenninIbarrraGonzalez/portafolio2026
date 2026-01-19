import {
  fadeInUp,
  fadeIn,
  slideInFromLeft,
  slideInFromRight,
  scaleIn,
  staggerContainer,
  staggerContainerSlow,
  staggerContainerFast,
  parallaxUp,
  parallaxDown,
  revealFromCenter,
  rotateIn,
  blurIn,
  pageTransition,
  modalBackdrop,
  modalContent,
  cardHover,
  float,
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

  describe('fadeIn', () => {
    it('has hidden state with opacity 0', () => {
      expect(fadeIn.hidden).toEqual({ opacity: 0 });
    });

    it('has visible state with full opacity', () => {
      expect(fadeIn.visible).toMatchObject({ opacity: 1 });
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

  describe('scaleIn', () => {
    it('has hidden state with reduced scale', () => {
      expect(scaleIn.hidden).toEqual({ opacity: 0, scale: 0.8 });
    });

    it('has visible state with full scale', () => {
      expect(scaleIn.visible).toMatchObject({ opacity: 1, scale: 1 });
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

  describe('parallaxUp', () => {
    it('has hidden state with large y offset', () => {
      expect(parallaxUp.hidden).toEqual({ opacity: 0, y: 100 });
    });

    it('has visible state with no offset', () => {
      expect(parallaxUp.visible).toMatchObject({ opacity: 1, y: 0 });
    });

    it('has longer transition duration', () => {
      const visible = parallaxUp.visible as { transition: { duration: number } };
      expect(visible.transition.duration).toBe(0.8);
    });
  });

  describe('parallaxDown', () => {
    it('has hidden state with negative y offset', () => {
      expect(parallaxDown.hidden).toEqual({ opacity: 0, y: -100 });
    });

    it('has visible state with no offset', () => {
      expect(parallaxDown.visible).toMatchObject({ opacity: 1, y: 0 });
    });
  });

  describe('revealFromCenter', () => {
    it('has hidden state with reduced scale', () => {
      expect(revealFromCenter.hidden).toEqual({ opacity: 0, scale: 0.5 });
    });

    it('has visible state with full scale', () => {
      expect(revealFromCenter.visible).toMatchObject({ opacity: 1, scale: 1 });
    });
  });

  describe('rotateIn', () => {
    it('has hidden state with rotation and reduced scale', () => {
      expect(rotateIn.hidden).toEqual({ opacity: 0, rotate: -10, scale: 0.9 });
    });

    it('has visible state with no rotation and full scale', () => {
      expect(rotateIn.visible).toMatchObject({ opacity: 1, rotate: 0, scale: 1 });
    });
  });

  describe('blurIn', () => {
    it('has hidden state with blur filter', () => {
      expect(blurIn.hidden).toEqual({ opacity: 0, filter: 'blur(10px)' });
    });

    it('has visible state with no blur', () => {
      expect(blurIn.visible).toMatchObject({ opacity: 1, filter: 'blur(0px)' });
    });
  });

  describe('pageTransition', () => {
    it('has initial state', () => {
      expect(pageTransition.initial).toEqual({ opacity: 0, y: 20 });
    });

    it('has animate state', () => {
      expect(pageTransition.animate).toMatchObject({ opacity: 1, y: 0 });
    });

    it('has exit state', () => {
      expect(pageTransition.exit).toMatchObject({ opacity: 0, y: -20 });
    });
  });

  describe('modalBackdrop', () => {
    it('has hidden state with opacity 0', () => {
      expect(modalBackdrop.hidden).toEqual({ opacity: 0 });
    });

    it('has visible state with full opacity', () => {
      expect(modalBackdrop.visible).toMatchObject({ opacity: 1 });
    });

    it('has exit state', () => {
      expect(modalBackdrop.exit).toMatchObject({ opacity: 0 });
    });
  });

  describe('modalContent', () => {
    it('has hidden state with reduced scale and offset', () => {
      expect(modalContent.hidden).toEqual({ opacity: 0, scale: 0.9, y: 20 });
    });

    it('has visible state with full scale', () => {
      expect(modalContent.visible).toMatchObject({ opacity: 1, scale: 1, y: 0 });
    });

    it('has spring transition in visible state', () => {
      const visible = modalContent.visible as { transition: { type: string } };
      expect(visible.transition.type).toBe('spring');
    });

    it('has exit state', () => {
      expect(modalContent.exit).toMatchObject({ opacity: 0, scale: 0.9, y: 20 });
    });
  });

  describe('cardHover', () => {
    it('has rest state with no transformation', () => {
      expect(cardHover.rest).toEqual({ scale: 1, y: 0 });
    });

    it('has hover state with scale and lift', () => {
      expect(cardHover.hover).toMatchObject({ scale: 1.02, y: -5 });
    });
  });

  describe('float', () => {
    it('has initial state', () => {
      expect(float.initial).toEqual({ y: 0 });
    });

    it('has animate state with y keyframes', () => {
      expect(float.animate.y).toEqual([-10, 10, -10]);
    });

    it('has infinite repeat in transition', () => {
      expect(float.animate.transition.repeat).toBe(Infinity);
    });

    it('has correct duration', () => {
      expect(float.animate.transition.duration).toBe(6);
    });
  });
});
