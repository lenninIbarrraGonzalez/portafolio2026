'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { CONTACT_SOCIAL_LINKS } from '@/config/social';

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function Contact() {
  const t = useTranslations('contact');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [emailError, setEmailError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    if (!email) return false;
    return EMAIL_REGEX.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email before submission
    if (!validateEmail(formData.email)) {
      setEmailError(t('form.invalidEmail'));
      return;
    }

    setEmailError(null);
    setStatus('sending');

    // Simulate form submission (replace with actual implementation)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For demo purposes, always succeed
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });

    // Reset status after 3 seconds
    setTimeout(() => setStatus('idle'), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear email error when user starts typing
    if (name === 'email' && emailError) {
      setEmailError(null);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-secondary/30" ref={ref}>
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
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-2xl mx-auto"
        >
          {/* Contact Form */}
          <motion.form
            variants={fadeInUp}
            onSubmit={handleSubmit}
            className="bg-card rounded-xl border border-border p-6 sm:p-8 mb-8"
          >
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t('form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t('form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-invalid={emailError ? 'true' : 'false'}
                  aria-describedby={emailError ? 'email-error' : undefined}
                  className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                    emailError ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="john@example.com"
                />
                {emailError && (
                  <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
                    {emailError}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t('form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
              >
                {status === 'sending' ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                    />
                    {t('form.sending')}
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    {t('form.success')}
                  </>
                ) : status === 'error' ? (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    {t('form.error')}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t('form.send')}
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>

          {/* Social Links */}
          <motion.div variants={fadeInUp} className="text-center">
            <p className="text-muted-foreground mb-4">{t('social.title')}</p>
            <div className="flex justify-center gap-4">
              {CONTACT_SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
