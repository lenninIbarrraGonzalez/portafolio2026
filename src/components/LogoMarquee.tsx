'use client';

import { motion } from 'framer-motion';

const technologies = [
  { name: 'React', color: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Tailwind', color: '#06B6D4' },
  { name: 'GraphQL', color: '#E10098' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'Git', color: '#F05032' },
];

// Duplicate for seamless loop
const duplicatedTech = [...technologies, ...technologies];

export function LogoMarquee() {
  return (
    <div className="w-full overflow-hidden py-8">
      <motion.div
        className="flex gap-4 sm:gap-6 md:gap-8 items-center"
        animate={{
          x: [0, -50 * technologies.length],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 20,
            ease: 'linear',
          },
        }}
      >
        {duplicatedTech.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-full bg-card/50 border border-border/50 backdrop-blur-sm whitespace-nowrap hover:border-primary/30 transition-colors"
          >
            <div
              className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
              style={{ backgroundColor: tech.color }}
            />
            <span className="text-xs sm:text-sm font-medium text-muted-foreground">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
