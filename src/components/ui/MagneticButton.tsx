'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  strength?: number;
  download?: boolean;
  'aria-label'?: string;
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  as = 'button',
  href,
  target,
  rel,
  strength = 0.15,
  download,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Cache bounding rect to avoid layout thrashing
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!rectRef.current) return;

    const rect = rectRef.current;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    setPosition({
      x: distanceX * strength,
      y: distanceY * strength,
    });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
    rectRef.current = null;
  }, []);

  const springTransition = {
    type: 'spring' as const,
    stiffness: 200,
    damping: 20,
    mass: 0.8,
  };

  if (as === 'a') {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        download={download}
        aria-label={ariaLabel}
        className={className}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={position}
        transition={springTransition}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={position}
      transition={springTransition}
    >
      {children}
    </motion.button>
  );
}
