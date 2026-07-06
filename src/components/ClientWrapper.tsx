'use client';

import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { SmoothScroll } from '@/components/ui/SmoothScroll';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      {/* reducedMotion="user" makes Framer Motion honor prefers-reduced-motion
          globally: transform/layout animations are skipped for those users. */}
      <MotionConfig reducedMotion="user">
        <LoadingScreen onComplete={() => setIsLoading(false)} />
        <CustomCursor />
        <ScrollProgress />

        <AnimatePresence mode="wait">
          {!isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SmoothScroll>{children}</SmoothScroll>
            </motion.div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </ThemeProvider>
  );
}
