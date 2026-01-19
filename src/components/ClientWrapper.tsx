'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { ThemeProvider } from '@/components/ThemeProvider';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}
