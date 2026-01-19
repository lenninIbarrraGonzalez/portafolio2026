'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import Image from 'next/image';
import { Calendar, ChevronRight, Trophy, RotateCw } from 'lucide-react';
import { slideInFromLeft, slideInFromRight, staggerContainer } from '@/lib/animations';

const jobs = [
  {
    key: 'monks',
    logo: '/images/logomomksnegro.png',
  },
  {
    key: 'hoitsu',
    logo: '/images/hoitsu_logo.jpeg',
  },
  {
    key: 'comfama',
    logo: null,
  },
  {
    key: 'itglobers',
    logo: '/images/logoitglobers.jpeg',
  },
  {
    key: 'indra',
    logo: '/images/logoindraazul.jpg',
  },
  {
    key: 'cabildo',
    logo: null,
  },
  {
    key: 'parquesoft',
    logo: '/images/LogoPSN.svg',
  },
];

export function Experience() {
  const t = useTranslations('experience');
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="py-12 sm:py-16 lg:py-32 bg-secondary/30" ref={containerRef}>
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

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto"
        >
          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line Background */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

            {/* Animated Timeline Line */}
            <motion.div
              className="absolute left-0 md:left-1/2 top-0 w-px timeline-line md:-translate-x-1/2 origin-top"
              style={{ height: lineHeight }}
            />

            {jobs.map((job, index) => {
              const isLeft = index % 2 === 0;
              const variants = isLeft ? slideInFromRight : slideInFromLeft;

              return (
                <motion.div
                  key={job.key}
                  variants={variants}
                  className={`relative flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 mb-12 ${
                    isLeft ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background md:-translate-x-1/2 z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: 'spring' }}
                  />

                  {/* Content Card */}
                  <div
                    className={`pl-6 md:pl-0 md:w-[calc(50%-2rem)] ${
                      isLeft ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'
                    }`}
                  >
                    {/* Mobile: Static card without flip */}
                    <div className="md:hidden ml-4 p-4 bg-card rounded-xl border border-border shadow-sm">
                      {/* Logo & Company */}
                      <div className="flex items-center gap-3 mb-2">
                        {job.logo && (
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
                            <Image
                              src={job.logo}
                              alt={t(`jobs.${job.key}.company`)}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-bold text-foreground text-base">
                            {t(`jobs.${job.key}.company`)}
                          </h3>
                          <p className="text-sm text-primary font-medium">
                            {t(`jobs.${job.key}.role`)}
                          </p>
                        </div>
                      </div>

                      {/* Period */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>{t(`jobs.${job.key}.period`)}</span>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-3 text-sm">
                        {t(`jobs.${job.key}.description`)}
                      </p>

                      {/* Highlights */}
                      <ul className="space-y-1">
                        {(t.raw(`jobs.${job.key}.highlights`) as string[]).map(
                          (highlight: string) => (
                            <li
                              key={`${job.key}-mobile-highlight-${highlight.slice(0, 20)}`}
                              className="flex items-start gap-2 text-sm"
                            >
                              <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{highlight}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* Desktop: Card with flip animation */}
                    <div className="hidden md:block" style={{ perspective: '1000px' }}>
                      <motion.div
                        className="relative w-full h-[300px]"
                        style={{ transformStyle: 'preserve-3d' }}
                        initial={{ rotateY: 0 }}
                        whileHover={{ rotateY: 180 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                      >
                        {/* Front Face */}
                        <div
                          className="absolute inset-0 p-5 bg-card rounded-xl border border-border shadow-sm overflow-hidden"
                          style={{ backfaceVisibility: 'hidden' }}
                        >
                          {/* Logo & Company */}
                          <div className="flex items-center gap-3 mb-2">
                            {job.logo && (
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
                                <Image
                                  src={job.logo}
                                  alt={t(`jobs.${job.key}.company`)}
                                  fill
                                  className="object-contain p-1"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <h3 className="font-bold text-foreground text-base">
                                {t(`jobs.${job.key}.company`)}
                              </h3>
                              <p className="text-sm text-primary font-medium">
                                {t(`jobs.${job.key}.role`)}
                              </p>
                            </div>
                            <RotateCw className="w-4 h-4 text-muted-foreground/40" />
                          </div>

                          {/* Period */}
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>{t(`jobs.${job.key}.period`)}</span>
                          </div>

                          {/* Description */}
                          <p className="text-muted-foreground mb-2 text-sm">
                            {t(`jobs.${job.key}.description`)}
                          </p>

                          {/* Highlights */}
                          <ul className="space-y-1">
                            {(t.raw(`jobs.${job.key}.highlights`) as string[]).map(
                              (highlight: string) => (
                                <li
                                  key={`${job.key}-desktop-highlight-${highlight.slice(0, 20)}`}
                                  className="flex items-start gap-2 text-sm"
                                >
                                  <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                  <span className="text-muted-foreground">{highlight}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>

                        {/* Back Face - Achievements */}
                        <div
                          className="absolute inset-0 p-5 bg-card rounded-xl border border-border shadow-sm flex flex-col"
                          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <Trophy className="w-5 h-5 text-primary" />
                            <h4 className="font-bold text-foreground text-base">{t('achievementsTitle')}</h4>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3">
                            {t(`jobs.${job.key}.company`)} - {t(`jobs.${job.key}.role`)}
                          </p>

                          <ul className="space-y-2">
                            {(t.raw(`jobs.${job.key}.achievements`) as string[]).map(
                              (achievement: string) => (
                                <li
                                  key={`${job.key}-achievement-${achievement.slice(0, 20)}`}
                                  className="flex items-start gap-2 text-sm"
                                >
                                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                                  <span className="text-foreground">{achievement}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
