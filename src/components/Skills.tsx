'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { Code, Server, Wrench, Users } from 'lucide-react';
import { fadeInUp, scaleIn, staggerContainer } from '@/lib/animations';

const categoryIcons: Record<string, typeof Code> = {
  frontend: Code,
  backend: Server,
  tools: Wrench,
  soft: Users,
};

const categories = ['frontend', 'backend', 'tools', 'soft'];

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
          {categories.map((category) => {
            const Icon = categoryIcons[category];
            const skills = t.raw(`categories.${category}.skills`) as string[];

            return (
              <motion.div
                key={category}
                variants={fadeInUp}
                className="p-6 bg-card rounded-xl border border-border"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {t(`categories.${category}.title`)}
                  </h3>
                </div>

                {/* Skills Grid */}
                <motion.div
                  variants={staggerContainer}
                  className="flex flex-wrap gap-2"
                >
                  {skills.map((skill: string) => (
                    <motion.span
                      key={skill}
                      variants={scaleIn}
                      className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
