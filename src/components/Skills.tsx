'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiVuedotjs,
  SiRedux,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiGraphql,
  SiGit,
  SiDocker,
  SiAmazonwebservices,
  SiJest,
  SiWebpack,
  SiGithubactions,
} from 'react-icons/si';
import { IconType } from 'react-icons';

interface Skill {
  icon: IconType;
  name: string;
  color: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      { icon: SiReact, name: 'React', color: '#61DAFB' },
      { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
      { icon: SiNextdotjs, name: 'Next.js', color: '#ffffff' },
      { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
      { icon: SiHtml5, name: 'HTML5', color: '#E34F26' },
      { icon: SiCss3, name: 'CSS3', color: '#1572B6' },
      { icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4' },
      { icon: SiVuedotjs, name: 'Vue.js', color: '#4FC08D' },
      { icon: SiRedux, name: 'Redux', color: '#764ABC' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
      { icon: SiPython, name: 'Python', color: '#3776AB' },
      { icon: SiPostgresql, name: 'PostgreSQL', color: '#4169E1' },
      { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
      { icon: SiGraphql, name: 'GraphQL', color: '#E10098' },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { icon: SiGit, name: 'Git', color: '#F05032' },
      { icon: SiDocker, name: 'Docker', color: '#2496ED' },
      { icon: SiAmazonwebservices, name: 'AWS', color: '#FF9900' },
      { icon: SiJest, name: 'Jest', color: '#C21325' },
      { icon: SiWebpack, name: 'Webpack', color: '#8DD6F9' },
      { icon: SiGithubactions, name: 'CI/CD', color: '#2088FF' },
    ],
  },
];

interface SkillIconProps {
  skill: Skill;
  delay: number;
  isInView: boolean;
}

function SkillIcon({ skill, delay, isInView }: SkillIconProps) {
  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      className="skill-item flex flex-col items-center gap-2 group"
      style={{ '--skill-color': skill.color } as React.CSSProperties}
    >
      <div
        className="relative p-2.5 sm:p-3 md:p-4 bg-card rounded-xl border border-border cursor-pointer transition-all duration-200 hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_20px_var(--skill-color-40)]"
        style={{ '--skill-color-40': `${skill.color}40` } as React.CSSProperties}
      >
        <Icon
          className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-muted-foreground transition-colors duration-200 group-hover:text-[var(--skill-color)]"
          aria-hidden="true"
        />
        {/* Glow effect on hover - using CSS */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle at center, ${skill.color}20 0%, transparent 70%)`,
          }}
        />
      </div>
      <span
        className="text-xs font-medium text-muted-foreground transition-colors duration-200 group-hover:text-[var(--skill-color)]"
        aria-label={skill.name}
      >
        {skill.name}
      </span>
    </motion.div>
  );
}

export function Skills() {
  const t = useTranslations('skills');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-12 sm:py-16 lg:py-32" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('title')}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-12 max-w-5xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: categoryIndex * 0.2, duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
                {category.title}
              </h3>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <SkillIcon
                    key={skill.name}
                    skill={skill}
                    delay={categoryIndex * 0.1 + skillIndex * 0.05}
                    isInView={isInView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
