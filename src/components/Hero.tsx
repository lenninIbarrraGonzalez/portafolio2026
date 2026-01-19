'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowDown, Download } from 'lucide-react';
import { fadeInUp, staggerContainerFast } from '@/lib/animations';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { TypewriterTitle } from '@/components/TypewriterTitle';
import { CodeEditor } from '@/components/CodeEditor';
import { HERO_SOCIAL_LINKS, LINKEDIN_URL, PERSONAL_INFO } from '@/config/social';

export function Hero() {
  const t = useTranslations('hero');

  const handleScrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get roles from i18n
  const roles = t.raw('roles') as string[];

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16 lg:pt-20 overflow-hidden">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-1 flex flex-col justify-center">
        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
        >
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground mb-2"
            >
              {t('greeting')}
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              <span className="gradient-text">{t('name')}</span>
            </motion.h1>

            <motion.h2
              variants={fadeInUp}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-primary mb-10 h-[1.2em]"
            >
              <TypewriterTitle strings={roles} />
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8"
            >
              {t('subtitle')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <MagneticButton
                onClick={handleScrollToProjects}
                className="px-6 py-2.5 sm:px-8 sm:py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors pulse-glow"
              >
                {t('cta')}
              </MagneticButton>
              <MagneticButton
                as="a"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 sm:px-8 sm:py-3 border border-border text-foreground rounded-lg font-medium hover:bg-secondary transition-colors"
              >
                {t('contact')}
              </MagneticButton>
              <MagneticButton
                as="a"
                href={PERSONAL_INFO.cvPath}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 sm:px-8 sm:py-3 border border-border text-foreground rounded-lg font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                {t('downloadCV')}
              </MagneticButton>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={fadeInUp}
              className="flex gap-4 sm:gap-6 justify-center lg:justify-start"
            >
              {HERO_SOCIAL_LINKS.map((social) => (
                <MagneticButton
                  key={social.label}
                  as="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-3 sm:p-4 rounded-xl bg-card border border-border text-foreground hover:text-primary hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                  strength={0.3}
                >
                  <social.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </MagneticButton>
              ))}
            </motion.div>
          </div>

          {/* Code Editor */}
          <motion.div variants={fadeInUp} className="flex-1 w-full max-w-xl lg:max-w-none">
            <CodeEditor isInView={true} />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={handleScrollToAbout}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleScrollToAbout();
            }
          }}
          className="p-2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          aria-label={t('scrollDown')}
          tabIndex={0}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </section>
  );
}
