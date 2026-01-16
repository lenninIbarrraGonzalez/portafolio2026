'use client';

import { motion } from 'framer-motion';

const technologies = [
  'React',
  'TypeScript',
  'Next.js',
  'Node.js',
  'Tailwind CSS',
  'PostgreSQL',
  'MongoDB',
  'GraphQL',
  'Docker',
  'AWS',
  'Git',
  'Jest',
  'Redux',
  'Vue.js',
  'Python',
  'Figma',
];

export function LogoMarquee() {
  return (
    <div className="py-12 overflow-hidden bg-secondary/30">
      <div className="marquee">
        <div className="marquee-content">
          {technologies.map((tech, index) => (
            <motion.div
              key={`${tech}-1-${index}`}
              className="flex items-center gap-2 px-6 py-3 bg-card rounded-full border border-border"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                {tech}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="marquee-content" aria-hidden>
          {technologies.map((tech, index) => (
            <motion.div
              key={`${tech}-2-${index}`}
              className="flex items-center gap-2 px-6 py-3 bg-card rounded-full border border-border"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                {tech}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
