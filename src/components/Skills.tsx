'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { Code, Server, Wrench, Users } from 'lucide-react';
import { fadeInUp, scaleIn, staggerContainer } from '@/lib/animations';

const categoryIcons: Record<string, typeof Code> = {
  frontend: Code,
  backend: Server,
  tools: Wrench,
  soft: Users,
};

const categoryColors: Record<string, string> = {
  frontend: 'from-accent-orange to-accent-orange/50',
  backend: 'from-accent-green to-accent-green/50',
  tools: 'from-accent-blue to-accent-blue/50',
  soft: 'from-primary to-primary/50',
};

const categories = ['frontend', 'backend', 'tools', 'soft'];

// Skill proficiency levels (0-100)
const skillLevels: Record<string, Record<string, number>> = {
  frontend: {
    'React': 95,
    'TypeScript': 90,
    'Next.js': 88,
    'JavaScript': 95,
    'HTML/CSS': 95,
    'Tailwind CSS': 92,
    'Vue.js': 75,
    'Redux': 85,
  },
  backend: {
    'Node.js': 80,
    'Python': 70,
    'PostgreSQL': 75,
    'MongoDB': 72,
    'REST APIs': 90,
    'GraphQL': 70,
  },
  tools: {
    'Git': 92,
    'Docker': 70,
    'AWS': 65,
    'CI/CD': 78,
    'Jest': 82,
    'Webpack': 75,
  },
  soft: {},
};

interface SkillBarProps {
  skill: string;
  level: number;
  colorClass: string;
  delay: number;
  isInView: boolean;
}

function SkillBar({ skill, level, colorClass, delay, isInView }: SkillBarProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.3 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-foreground">{skill}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="text-xs text-muted-foreground"
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${colorClass}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

export function Skills() {
  const t = useTranslations('skills');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-20 lg:py-32" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('title')}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {categories.map((category, categoryIndex) => {
            const Icon = categoryIcons[category];
            const skills = t.raw(`categories.${category}.skills`) as string[];
            const colorClass = categoryColors[category];
            const hasLevels = Object.keys(skillLevels[category]).length > 0;

            return (
              <motion.div
                key={category}
                variants={fadeInUp}
                className="p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow duration-300"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="p-2 bg-primary/10 rounded-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {t(`categories.${category}.title`)}
                  </h3>
                </div>

                {/* Skills */}
                {hasLevels ? (
                  <div className="space-y-4">
                    {skills.map((skill: string, index: number) => {
                      const level = skillLevels[category][skill] || 75;
                      return (
                        <SkillBar
                          key={skill}
                          skill={skill}
                          level={level}
                          colorClass={colorClass}
                          delay={categoryIndex * 0.1 + index * 0.05}
                          isInView={isInView}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <motion.div
                    variants={staggerContainer}
                    className="flex flex-wrap gap-2"
                  >
                    {skills.map((skill: string, index: number) => (
                      <motion.span
                        key={skill}
                        variants={scaleIn}
                        custom={index}
                        className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
