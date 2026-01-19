'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);

  // Use refs to track all timers and intervals
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lineIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const completeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const glitchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isCompleteTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideLoadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize onComplete to prevent dependency issues
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const codeLines = [
    '> Initializing portfolio...',
    '> Loading components...',
    '> Fetching experience data...',
    '> Compiling projects...',
    '> Optimizing assets...',
    '> Ready!',
  ];

  const clearAllTimers = useCallback(() => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (lineIntervalRef.current) clearInterval(lineIntervalRef.current);
    if (completeTimeoutRef.current) clearTimeout(completeTimeoutRef.current);
    if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
    if (isCompleteTimeoutRef.current) clearTimeout(isCompleteTimeoutRef.current);
    if (hideLoadingTimeoutRef.current) clearTimeout(hideLoadingTimeoutRef.current);
  }, []);

  useEffect(() => {
    // Check if user has already seen loading screen in this session
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoading');
    if (hasSeenLoading) {
      setShowLoading(false);
      onCompleteRef.current?.();
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShowLoading(false);
      sessionStorage.setItem('hasSeenLoading', 'true');
      onCompleteRef.current?.();
      return;
    }

    // Simulate loading progress
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 15 + 5;
        const newProgress = Math.min(prev + increment, 100);
        return newProgress;
      });
    }, 200);

    // Show code lines progressively
    lineIntervalRef.current = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev < codeLines.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 400);

    // Complete loading
    completeTimeoutRef.current = setTimeout(() => {
      setProgress(100);
      setCurrentLine(codeLines.length - 1);

      // Trigger glitch effect
      setGlitchActive(true);
      glitchTimeoutRef.current = setTimeout(() => setGlitchActive(false), 300);

      isCompleteTimeoutRef.current = setTimeout(() => {
        setIsComplete(true);
        sessionStorage.setItem('hasSeenLoading', 'true');
        hideLoadingTimeoutRef.current = setTimeout(() => {
          setShowLoading(false);
          onCompleteRef.current?.();
        }, 500);
      }, 500);
    }, 2500);

    return clearAllTimers;
  }, [clearAllTimers, codeLines.length]);

  if (!showLoading) return null;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="loading-screen grid-pattern"
        >
          <div className="relative z-10 text-center max-w-md w-full px-6">
            {/* Logo/Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1
                className={`text-4xl font-bold gradient-text glitch ${glitchActive ? 'active' : ''}`}
                data-text="Lennin Ibarra"
              >
                Lennin Ibarra
              </h1>
              <p className="text-muted-foreground mt-2">Portfolio</p>
            </motion.div>

            {/* Terminal-style code */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-card/80 rounded-lg p-4 mb-6 text-left border border-border"
            >
              {codeLines.slice(0, currentLine + 1).map((line, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`terminal-text text-sm font-mono ${
                    index === currentLine ? 'text-accent-green' : 'text-muted-foreground'
                  }`}
                >
                  {line}
                  {index === currentLine && <span className="cursor-blink">_</span>}
                </motion.p>
              ))}
            </motion.div>

            {/* Progress Bar */}
            <div className="relative h-2 bg-muted rounded-full overflow-hidden mb-4">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent-orange via-accent-green to-accent-blue"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Progress Text */}
            <motion.p
              className="text-sm text-muted-foreground font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {Math.round(progress)}% loaded
            </motion.p>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent-green/5 rounded-full blur-3xl" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
