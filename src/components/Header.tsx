'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { key: 'about', href: '#about' },
  { key: 'experience', href: '#experience' },
  { key: 'education', href: '#education' },
  { key: 'skills', href: '#skills' },
  { key: 'projects', href: '#projects' },
  { key: 'testimonials', href: '#testimonials' },
  { key: 'contact', href: '#contact' },
];

export function Header() {
  const t = useTranslations('header');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  const toggleLocale = () => {
    const newLocale = locale === 'es' ? 'en' : 'es';
    router.replace(pathname, { locale: newLocale });
  };

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-xl font-bold text-foreground"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            LI
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.key}
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
              >
                {t(item.key)}
              </motion.button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <motion.button
              onClick={toggleLocale}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={tCommon('language')}
            >
              <Globe className="w-5 h-5" />
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isDark ? tCommon('lightMode') : tCommon('darkMode')}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.key}
                    onClick={() => handleNavClick(item.href)}
                    className="block w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {t(item.key)}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
