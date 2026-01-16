'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import Image from 'next/image';
import { Calendar, ChevronRight } from 'lucide-react';
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
    <section id="experience" className="py-20 lg:py-32 bg-secondary/30" ref={containerRef}>
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
                  className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
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
                  <motion.div
                    className={`ml-8 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isLeft ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'
                    }`}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="p-6 bg-card rounded-xl border border-border shadow-sm hover:shadow-lg transition-shadow duration-300 gradient-border">
                      {/* Logo & Company */}
                      <div className="flex items-center gap-4 mb-4">
                        {job.logo && (
                          <motion.div
                            className="relative w-12 h-12 rounded-lg overflow-hidden bg-white flex items-center justify-center"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <Image
                              src={job.logo}
                              alt={t(`jobs.${job.key}.company`)}
                              fill
                              className="object-contain p-1"
                            />
                          </motion.div>
                        )}
                        <div>
                          <h3 className="font-bold text-foreground">
                            {t(`jobs.${job.key}.company`)}
                          </h3>
                          <p className="text-sm text-primary font-medium">
                            {t(`jobs.${job.key}.role`)}
                          </p>
                        </div>
                      </div>

                      {/* Period */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>{t(`jobs.${job.key}.period`)}</span>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-4">
                        {t(`jobs.${job.key}.description`)}
                      </p>

                      {/* Highlights */}
                      <ul className="space-y-2">
                        {(t.raw(`jobs.${job.key}.highlights`) as string[]).map(
                          (highlight: string, i: number) => (
                            <motion.li
                              key={i}
                              className="flex items-start gap-2 text-sm"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{highlight}</span>
                            </motion.li>
                          )
                        )}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
