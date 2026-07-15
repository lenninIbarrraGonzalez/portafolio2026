'use client';

import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from '@/components/ThemeProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { SmoothScroll } from '@/components/ui/SmoothScroll';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <ThemeProvider>
      {/* reducedMotion="user" makes Framer Motion honor prefers-reduced-motion
          globally: transform/layout animations are skipped for those users. */}
      <MotionConfig reducedMotion="user">
        {/* Content renders immediately; LoadingScreen is a fixed overlay (z-9999)
            that fades out on top. This avoids gating the page behind the splash,
            which previously delayed first paint and caused a large layout shift
            when children finally mounted. */}
        <SmoothScroll>{children}</SmoothScroll>

        <LoadingScreen />
        <CustomCursor />
        <ScrollProgress />
      </MotionConfig>
    </ThemeProvider>
  );
}
