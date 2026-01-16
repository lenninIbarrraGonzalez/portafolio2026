'use client';

import { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';

interface TypewriterTitleProps {
  strings: string[];
  className?: string;
}

export function TypewriterTitle({ strings, className = '' }: TypewriterTitleProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
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
