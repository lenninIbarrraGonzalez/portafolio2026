'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { Quote } from 'lucide-react';
import { fadeInUp, staggerContainerSlow } from '@/lib/animations';

const testimonials = ['monks', 'hoitsu', 'itglobers'];

export function Testimonials() {
  const t = useTranslations('testimonials');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="testimonials" className="py-12 sm:py-16 lg:py-32" ref={ref}>
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
          variants={staggerContainerSlow}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {testimonials.map((key) => (
            <motion.div
              key={key}
              variants={fadeInUp}
              className="relative p-6 bg-card rounded-xl border border-border"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-6">
                <div className="p-2 bg-primary rounded-lg">
                  <Quote className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>

              {/* Quote Text */}
              <blockquote className="pt-4 mb-6">
                <p className="text-muted-foreground italic leading-relaxed">
                  &ldquo;{t(`items.${key}.text`)}&rdquo;
                </p>
              </blockquote>

              {/* Author */}
              <footer className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {t(`items.${key}.author`).charAt(0)}
                  </span>
                </div>
                <div>
                  <cite className="not-italic font-semibold text-foreground block">
                    {t(`items.${key}.author`)}
                  </cite>
                  <span className="text-sm text-muted-foreground">
                    {t(`items.${key}.company`)}
                  </span>
                </div>
              </footer>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
