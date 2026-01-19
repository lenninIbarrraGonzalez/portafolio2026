'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HTMLIcon,
  CSSIcon,
  JSIcon,
  ReactIcon,
  generateStartPositions,
} from './shared/TechIcons';

type Phase = 'entering' | 'colliding' | 'react';

interface MiniHeroSceneProps {
  isInView?: boolean;
}

export function MiniHeroScene({ isInView = true }: MiniHeroSceneProps) {
  const [phase, setPhase] = useState<Phase>('entering');
  const [cycleKey, setCycleKey] = useState(0);

  const runAnimationCycle = useCallback(() => {
    if (!isInView) return [];

    setPhase('entering');

    // Logos enter -> collide -> React appears for 10s -> restart
    const timers = [
      setTimeout(() => setPhase('colliding'), 1500),
      setTimeout(() => setPhase('react'), 2500),
      setTimeout(() => {
        setCycleKey(k => k + 1);
      }, 12500), // 2.5s animation + 10s showing React logo
    ];

    return timers;
  }, [isInView]);

  useEffect(() => {
    const timers = runAnimationCycle();
    return () => timers.forEach(clearTimeout);
  }, [cycleKey, runAnimationCycle]);

  // Generate random start positions each cycle
  const startPositions = useMemo(() => {
    return generateStartPositions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycleKey]);

  // Floating positions (smaller offsets)
  const floatingPositions = {
    html: { x: -50, y: -30, rotate: 0, opacity: 1 },
    css: { x: 50, y: -30, rotate: 0, opacity: 1 },
    js: { x: 0, y: 40, rotate: 0, opacity: 1 },
  };

  if (!isInView) {
    return <div className="relative w-48 h-48" />;
  }

  return (
    <div className="relative w-48 h-48">
      {/* Main animation container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-48 h-48">
          {/* HTML Logo - 48px instead of 80px */}
          <AnimatePresence mode="wait">
            {(phase === 'entering' || phase === 'colliding') && (
              <motion.div
                key={`html-${cycleKey}`}
                className="absolute w-12 h-12"
                style={{ left: '50%', top: '50%', marginLeft: -24, marginTop: -24 }}
                initial={startPositions.html}
                animate={
                  phase === 'entering'
                    ? floatingPositions.html
                    : { x: 0, y: 0, scale: 0.6, rotate: 360, opacity: 1 }
                }
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: phase === 'entering' ? 1.5 : 1,
                  ease: 'easeOut',
                }}
              >
                <motion.div
                  animate={phase === 'entering' ? { y: [0, -5, 0] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <HTMLIcon />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CSS Logo */}
          <AnimatePresence mode="wait">
            {(phase === 'entering' || phase === 'colliding') && (
              <motion.div
                key={`css-${cycleKey}`}
                className="absolute w-12 h-12"
                style={{ left: '50%', top: '50%', marginLeft: -24, marginTop: -24 }}
                initial={startPositions.css}
                animate={
                  phase === 'entering'
                    ? floatingPositions.css
                    : { x: 0, y: 0, scale: 0.6, rotate: -360, opacity: 1 }
                }
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: phase === 'entering' ? 1.5 : 1,
                  ease: 'easeOut',
                  delay: phase === 'entering' ? 0.15 : 0,
                }}
              >
                <motion.div
                  animate={phase === 'entering' ? { y: [0, -8, 0] } : {}}
                  transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
                >
                  <CSSIcon />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* JavaScript Logo */}
          <AnimatePresence mode="wait">
            {(phase === 'entering' || phase === 'colliding') && (
              <motion.div
                key={`js-${cycleKey}`}
                className="absolute w-12 h-12"
                style={{ left: '50%', top: '50%', marginLeft: -24, marginTop: -24 }}
                initial={startPositions.js}
                animate={
                  phase === 'entering'
                    ? floatingPositions.js
                    : { x: 0, y: 0, scale: 0.6, rotate: 180, opacity: 1 }
                }
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: phase === 'entering' ? 1.5 : 1,
                  ease: 'easeOut',
                  delay: phase === 'entering' ? 0.3 : 0,
                }}
              >
                <motion.div
                  animate={phase === 'entering' ? { y: [0, -6, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                >
                  <JSIcon />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collision flash */}
          <AnimatePresence>
            {phase === 'react' && (
              <motion.div
                key={`flash-${cycleKey}`}
                className="absolute w-20 h-20 bg-white rounded-full"
                style={{ left: '50%', top: '50%', marginLeft: -40, marginTop: -40 }}
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            )}
          </AnimatePresence>

          {/* React Logo - 64px instead of 112px */}
          <AnimatePresence>
            {phase === 'react' && (
              <motion.div
                key={`react-${cycleKey}`}
                className="absolute w-16 h-16"
                style={{ left: '50%', top: '50%', marginLeft: -32, marginTop: -32 }}
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  <ReactIcon />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Glow effect behind React */}
          <AnimatePresence>
            {phase === 'react' && (
              <motion.div
                key={`glow-${cycleKey}`}
                className="absolute w-20 h-20 bg-[#61DAFB]/30 rounded-full blur-xl -z-10"
                style={{ left: '50%', top: '50%', marginLeft: -40, marginTop: -40 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
