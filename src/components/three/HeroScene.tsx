'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HTMLIcon,
  CSSIcon,
  JSIcon,
  ReactIcon,
  TECH_COLORS,
} from './shared/TechIcons';

// Particle component for explosion effect
const Particle = ({ delay, x, y, color }: { delay: number; x: number; y: number; color: string }) => (
  <motion.div
    className="absolute w-3 h-3 rounded-full"
    style={{ backgroundColor: color }}
    initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
    animate={{
      opacity: 0,
      scale: 0,
      x: x * 150,
      y: y * 150,
    }}
    transition={{ duration: 1, delay, ease: 'easeOut' }}
  />
);

type Phase = 'entering' | 'colliding' | 'react' | 'exploding';

export function HeroScene() {
  const [phase, setPhase] = useState<Phase>('entering');
  const [cycleKey, setCycleKey] = useState(0);

  const particles = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.cos((i / 24) * Math.PI * 2),
      y: Math.sin((i / 24) * Math.PI * 2),
      color: TECH_COLORS[i % TECH_COLORS.length],
      delay: i * 0.02,
    }));
  }, []);

  const runAnimationCycle = useCallback(() => {
    setPhase('entering');

    const timers = [
      setTimeout(() => setPhase('colliding'), 2000),
      setTimeout(() => setPhase('react'), 3500),
      setTimeout(() => setPhase('exploding'), 6000),
      setTimeout(() => {
        setCycleKey(k => k + 1);
      }, 7500),
    ];

    return timers;
  }, []);

  useEffect(() => {
    const timers = runAnimationCycle();
    return () => timers.forEach(clearTimeout);
  }, [cycleKey, runAnimationCycle]);

  // Generate random start positions each cycle (scaled for mobile)
  const startPositions = useMemo(() => {
    const positions = [
      { x: -150, y: -100 },
      { x: 150, y: -100 },
      { x: -150, y: 100 },
      { x: 150, y: 100 },
      { x: 0, y: -150 },
      { x: 0, y: 150 },
      { x: -180, y: 0 },
      { x: 180, y: 0 },
    ];
    const shuffled = [...positions].sort(() => Math.random() - 0.5);
    return {
      html: { ...shuffled[0], rotate: Math.random() * 360 - 180, opacity: 0 },
      css: { ...shuffled[1], rotate: Math.random() * 360 - 180, opacity: 0 },
      js: { ...shuffled[2], rotate: Math.random() * 360 - 180, opacity: 0 },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycleKey]);

  // Floating positions (visible, floating) with rotation reset and full opacity - scaled for mobile
  const floatingPositions = {
    html: { x: -60, y: -40, rotate: 0, opacity: 1 },
    css: { x: 60, y: -40, rotate: 0, opacity: 1 },
    js: { x: 0, y: 50, rotate: 0, opacity: 1 },
  };

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />

      {/* Floating particles background */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main animation container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
          {/* HTML Logo */}
          <AnimatePresence mode="wait">
            {(phase === 'entering' || phase === 'colliding') && (
              <motion.div
                key={`html-${cycleKey}`}
                className="absolute w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
                style={{ left: '50%', top: '50%', marginLeft: '-1.75rem', marginTop: '-1.75rem' }}
                initial={startPositions.html}
                animate={
                  phase === 'entering'
                    ? floatingPositions.html
                    : { x: 0, y: 0, scale: 0.6, rotate: 360, opacity: 1 }
                }
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: phase === 'entering' ? 2 : 1.5,
                  ease: 'easeOut',
                }}
              >
                <motion.div
                  animate={phase === 'entering' ? { y: [0, -8, 0] } : {}}
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
                className="absolute w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
                style={{ left: '50%', top: '50%', marginLeft: '-1.75rem', marginTop: '-1.75rem' }}
                initial={startPositions.css}
                animate={
                  phase === 'entering'
                    ? floatingPositions.css
                    : { x: 0, y: 0, scale: 0.6, rotate: -360, opacity: 1 }
                }
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: phase === 'entering' ? 2 : 1.5,
                  ease: 'easeOut',
                  delay: phase === 'entering' ? 0.2 : 0,
                }}
              >
                <motion.div
                  animate={phase === 'entering' ? { y: [0, -12, 0] } : {}}
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
                className="absolute w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
                style={{ left: '50%', top: '50%', marginLeft: '-1.75rem', marginTop: '-1.75rem' }}
                initial={startPositions.js}
                animate={
                  phase === 'entering'
                    ? floatingPositions.js
                    : { x: 0, y: 0, scale: 0.6, rotate: 180, opacity: 1 }
                }
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: phase === 'entering' ? 2 : 1.5,
                  ease: 'easeOut',
                  delay: phase === 'entering' ? 0.4 : 0,
                }}
              >
                <motion.div
                  animate={phase === 'entering' ? { y: [0, -10, 0] } : {}}
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
                className="absolute w-40 h-40 bg-white rounded-full"
                style={{ left: '50%', top: '50%', marginLeft: -80, marginTop: -80 }}
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </AnimatePresence>

          {/* React Logo */}
          <AnimatePresence>
            {(phase === 'react' || phase === 'exploding') && (
              <motion.div
                key={`react-${cycleKey}`}
                className="absolute w-28 h-28"
                style={{ left: '50%', top: '50%', marginLeft: -56, marginTop: -56 }}
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={
                  phase === 'react'
                    ? { scale: 1, rotate: 0, opacity: 1 }
                    : { scale: 3, opacity: 0 }
                }
                transition={
                  phase === 'react'
                    ? { type: 'spring', stiffness: 200, damping: 15 }
                    : { duration: 0.5 }
                }
              >
                <motion.div
                  animate={phase === 'react' ? { rotate: 360 } : {}}
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
                className="absolute w-40 h-40 bg-[#61DAFB]/30 rounded-full blur-2xl -z-10"
                style={{ left: '50%', top: '50%', marginLeft: -80, marginTop: -80 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.6, 0.4] }}
                exit={{ scale: 2, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </AnimatePresence>

          {/* Explosion particles */}
          <AnimatePresence>
            {phase === 'exploding' && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {particles.map((p) => (
                  <Particle key={`particle-${cycleKey}-${p.id}`} {...p} />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
