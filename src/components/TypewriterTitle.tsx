'use client';

import Typewriter from 'typewriter-effect';
import { useIsHydrated } from '@/lib/hooks/useIsHydrated';

interface TypewriterTitleProps {
  strings: string[];
  className?: string;
}

export function TypewriterTitle({ strings, className = '' }: TypewriterTitleProps) {
  const isHydrated = useIsHydrated();

  if (!isHydrated) {
    return (
      <span className={className}>
        {strings[0]}
        <span className="typewriter-cursor" />
      </span>
    );
  }

  return (
    <span className={className}>
      <Typewriter
        options={{
          strings,
          autoStart: true,
          loop: true,
          deleteSpeed: 50,
          delay: 80,
          cursor: '',
        }}
      />
      <span className="typewriter-cursor" />
    </span>
  );
}
