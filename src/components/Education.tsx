'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { GraduationCap, Award, BookOpen, MapPin, Calendar } from 'lucide-react';

const educationItems = [
  { key: 'university', icon: GraduationCap },
  { key: 'bpm', icon: Award },
  { key: 'platzi', icon: BookOpen },
];

export function Education() {
  const t = useTranslations('education');
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="education" className="py-12 sm:py-16 lg:py-32" ref={containerRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('title')}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-secondary/50 rounded-full p-1 sm:p-1.5 gap-0.5 sm:gap-1">
              {educationItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(index)}
                    className={`relative px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1 sm:gap-2 ${
                      activeTab === index
                        ? 'text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {activeTab === index && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">
                        {t(`items.${item.key}.degree`).split(' ').slice(0, 2).join(' ')}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="relative min-h-[240px] sm:min-h-[260px] md:min-h-[280px]">
            <AnimatePresence mode="wait">
              {educationItems.map((item, index) => {
                if (activeTab !== index) return null;
                const Icon = item.icon;
                const location = t(`items.${item.key}.location`);

                return (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-card rounded-2xl border border-border p-4 sm:p-6 md:p-8"
                  >
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-1">
                          {t(`items.${item.key}.degree`)}
                        </h3>
                        <p className="text-primary font-medium">
                          {t(`items.${item.key}.institution`)}
                        </p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                      {location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          <span>{location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{t(`items.${item.key}.date`)}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`items.${item.key}.description`)}
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
