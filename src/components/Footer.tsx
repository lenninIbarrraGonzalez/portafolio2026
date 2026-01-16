'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Heart, Coffee } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-8 border-t border-border"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} Lennin Ibarra. {t('rights')}.
          </p>

          {/* Made with */}
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            {t('madeWith')}{' '}
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />{' '}
            {t('and')}{' '}
            <Coffee className="w-4 h-4 text-amber-600" />{' '}
            {t('coffee')}
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
