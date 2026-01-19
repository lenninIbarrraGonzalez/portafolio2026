'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

// WeakMap to track elements that have listeners attached
const listenersAttached = new WeakSet<Element>();

export function CustomCursor() {
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

  // Stable event handlers using useCallback
  const handleInteractiveEnter = useCallback(() => setIsHovering(true), []);
  const handleInteractiveLeave = useCallback(() => setIsHovering(false), []);
  const handleImageEnter = useCallback(() => setIsHoveringImage(true), []);
  const handleImageLeave = useCallback(() => setIsHoveringImage(false), []);

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

    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );
      const imageElements = document.querySelectorAll('img, [data-cursor-expand]');

      interactiveElements.forEach((el) => {
        // Only add listeners if not already attached
        if (!listenersAttached.has(el)) {
          el.addEventListener('mouseenter', handleInteractiveEnter);
          el.addEventListener('mouseleave', handleInteractiveLeave);
          listenersAttached.add(el);
        }
      });

      imageElements.forEach((el) => {
        // Only add listeners if not already attached
        if (!listenersAttached.has(el)) {
          el.addEventListener('mouseenter', handleImageEnter);
          el.addEventListener('mouseleave', handleImageLeave);
          listenersAttached.add(el);
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    addHoverListeners();

    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible, isMobile, handleInteractiveEnter, handleInteractiveLeave, handleImageEnter, handleImageLeave]);

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
        }}
      >
        <motion.div
          className="rounded-full bg-white"
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
        }}
      >
        <motion.div
          className="rounded-full border-2 border-primary flex items-center justify-center"
          animate={{
            width: isHoveringImage ? 80 : isHovering ? 60 : 40,
            height: isHoveringImage ? 80 : isHovering ? 60 : 40,
            opacity: isVisible ? 1 : 0,
            borderColor: isHovering ? 'var(--primary)' : 'var(--primary)',
            backgroundColor: isHoveringImage ? 'rgba(255, 107, 53, 0.1)' : 'transparent',
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
              View
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
