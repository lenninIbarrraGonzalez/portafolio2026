'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { MapPin, Briefcase, Code, Building } from 'lucide-react';
import { fadeInUp, staggerContainerSlow } from '@/lib/animations';

const highlights = [
  { key: 'projects', icon: Code },
  { key: 'companies', icon: Building },
  { key: 'technologies', icon: Briefcase },
];

export function About() {
  const t = useTranslations('about');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-32" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto"
        >
          {/* Section Title */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t('title')}
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground text-center mb-12 leading-relaxed"
          >
            {t('description')}
          </motion.p>

          {/* Experience Badge */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full whitespace-nowrap">
              <Briefcase className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium">{t('experience', { years: 10 })}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full whitespace-nowrap">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium">{t('location')}</span>
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            variants={staggerContainerSlow}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {highlights.map((item) => (
              <motion.div
                key={item.key}
                variants={fadeInUp}
                className="flex flex-col items-center p-6 bg-card rounded-xl border border-border"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="p-3 bg-primary/10 rounded-lg mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-lg font-semibold text-foreground">
                  {t(`highlights.${item.key}`)}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
