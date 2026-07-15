'use client';

import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';
const IMAGE_SELECTOR = 'img, [data-cursor-expand]';

export function CustomCursor() {
  const t = useTranslations('projects');
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Event delegation: two bubbling listeners on `document` replace the previous
    // per-element listeners + MutationObserver. `mouseover`/`mouseout` bubble, so
    // `closest()` resolves the interactive ancestor without querying the DOM or
    // observing subtree mutations — this removes the forced-reflow hot path.
    const handleOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      if (target.closest(IMAGE_SELECTOR)) {
        setIsHoveringImage(true);
      } else if (target.closest(INTERACTIVE_SELECTOR)) {
        setIsHovering(true);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      const related = e.relatedTarget as Element | null;
      if (target.closest(IMAGE_SELECTOR) && !related?.closest?.(IMAGE_SELECTOR)) {
        setIsHoveringImage(false);
      }
      if (target.closest(INTERACTIVE_SELECTOR) && !related?.closest?.(INTERACTIVE_SELECTOR)) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, [cursorX, cursorY, isVisible, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Cursor pequeño - sigue exactamente */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
      >
        <motion.div
          className="rounded-full bg-primary dark:bg-white"
          animate={{
            width: 8,
            height: 8,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Cursor grande - sigue con delay */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
      >
        <motion.div
          className="rounded-full border-2 border-primary flex items-center justify-center"
          animate={{
            width: isHoveringImage ? 80 : isHovering ? 60 : 40,
            height: isHoveringImage ? 80 : isHovering ? 60 : 40,
            opacity: isVisible ? 1 : 0,
            backgroundColor: isHoveringImage ? 'rgba(255, 107, 53, 0.1)' : 'rgba(255, 107, 53, 0)',
          }}
          transition={{ duration: 0.2 }}
        >
          {isHoveringImage && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-xs font-medium text-primary"
            >
              {t('view')}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
