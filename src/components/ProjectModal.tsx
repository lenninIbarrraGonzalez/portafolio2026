'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ExternalLink, Github } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';

interface Project {
  key: string;
  image: string;
  link: string | null;
  github: string | null;
  title: string;
  description: string;
  tags: string[];
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap implementation
  const getFocusableElements = useCallback(() => {
    if (!modalRef.current) return [];
    return Array.from(
      modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    },
    [getFocusableElements, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      // Store current active element
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      // Focus the close button when modal opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'unset';

      // Restore focus to previous element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 modal-backdrop z-50"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-4 right-4 top-1/2 -translate-y-1/2 sm:left-6 sm:right-6 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl md:w-full max-h-[85vh] bg-card rounded-2xl overflow-hidden z-50 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-background/80 rounded-full hover:bg-background transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <h3 id="modal-title" className="text-2xl font-bold text-foreground mb-2">
                {project.title}
              </h3>

              <p className="text-muted-foreground mb-6">{project.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4">
                {project.link && (
                  <MagneticButton
                    as="a"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Project
                  </MagneticButton>
                )}
                {project.github && (
                  <MagneticButton
                    as="a"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-border text-foreground rounded-lg font-medium hover:bg-secondary transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </MagneticButton>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
