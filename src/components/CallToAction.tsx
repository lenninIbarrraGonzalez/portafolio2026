'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowRight } from 'lucide-react';

const MiniHeroScene = dynamic(
  () => import('@/components/three/MiniHeroScene').then((mod) => mod.MiniHeroScene),
  { ssr: false }
);

export function CallToAction() {
  const t = useTranslations('cta');
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="contact" ref={containerRef} className="py-12 sm:py-16 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
          {/* Animated background blobs - behind card */}
          <motion.div
            className="absolute -top-10 -left-10 sm:-top-20 sm:-left-20 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-[#ff6b35]/20 rounded-full blur-3xl -z-10"
            animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-10 -right-10 sm:-bottom-20 sm:-right-20 w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-[#3b82f6]/20 rounded-full blur-3xl -z-10"
            animate={{ scale: [1.2, 1, 1.2], y: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-[#10b981]/15 rounded-full blur-3xl -z-10"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          {/* Solid Bento-style card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-background p-4 sm:p-6 md:p-8 lg:p-12
              border border-primary/20 shadow-lg
              hover:shadow-xl transition-all duration-300"
          >
            {/* Grid pattern background */}
            <div className="absolute inset-0 grid-pattern opacity-50" />

            {/* Subtle internal glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
              {/* Mini 3D Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex-shrink-0"
              >
                <MiniHeroScene isInView={isInView} />
              </motion.div>

              {/* Content */}
              <div className="flex-1 text-left">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6"
                >
                  {t('title')}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed"
                >
                  {t('message')}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <a
                    href="https://www.linkedin.com/in/lennin-geovanny-ibarra/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-lg"
                  >
                    {t('button')}
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
