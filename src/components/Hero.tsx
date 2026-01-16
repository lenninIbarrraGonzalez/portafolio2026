'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { fadeInUp, staggerContainerFast } from '@/lib/animations';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { TypewriterTitle } from '@/components/TypewriterTitle';

const HeroScene = dynamic(
  () => import('@/components/three/HeroScene').then((mod) => mod.HeroScene),
  { ssr: false }
);

const socialLinks = [
  { icon: Github, href: 'https://github.com/satanas', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/lenninibarra', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:lennin.ibarra@gmail.com', label: 'Email' },
];

export function Hero() {
  const t = useTranslations('hero');

  const handleScrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const roles = [
    'Frontend Developer',
    'React Expert',
    'UI Engineer',
    'TypeScript Enthusiast',
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 lg:pt-20 overflow-hidden">
      {/* 3D Background */}
      <HeroScene />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
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
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            >
              <span className="gradient-text">{t('name')}</span>
            </motion.h1>

            <motion.h2
              variants={fadeInUp}
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary mb-6 h-[1.2em]"
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
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors pulse-glow"
              >
                {t('cta')}
              </MagneticButton>
              <MagneticButton
                onClick={handleScrollToContact}
                className="px-8 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-secondary transition-colors"
              >
                {t('contact')}
              </MagneticButton>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={fadeInUp}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {socialLinks.map((social) => (
                <MagneticButton
                  key={social.label}
                  as="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  strength={0.3}
                >
                  <social.icon className="w-5 h-5" />
                </MagneticButton>
              ))}
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div variants={fadeInUp} className="relative">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Animated glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-orange), var(--accent-green), var(--accent-blue))',
                  padding: '4px',
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <div className="absolute inset-1 bg-background rounded-full" />
              </motion.div>

              {/* Blur glow */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />

              <Image
                src="/images/lenninibarra.jpeg"
                alt="Lennin Ibarra"
                fill
                className="object-cover rounded-full border-4 border-card relative z-10"
                priority
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={() => {
              const element = document.querySelector('#about');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            aria-label="Scroll down"
          >
            <ArrowDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
