'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const projects = [
  {
    key: 'ditu',
    image: '/images/DITU-MONKS.png',
    link: null,
    github: null,
  },
  {
    key: 'bpmn',
    image: '/images/BPMN-HOITSU.png',
    link: null,
    github: null,
  },
  {
    key: 'tigo',
    image: '/images/proyecto-indra1.png',
    link: null,
    github: null,
  },
  {
    key: 'romancerelax',
    image: '/images/proyecto-itglobers.png',
    link: null,
    github: null,
  },
  {
    key: 'informando',
    image: '/images/informando-parquesoft.png',
    link: null,
    github: null,
  },
  {
    key: 'pqrd',
    image: '/images/pqrd-parquesoft2.png',
    link: null,
    github: null,
  },
];

export function Projects() {
  const t = useTranslations('projects');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-32 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('title')}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {projects.map((project) => (
            <motion.article
              key={project.key}
              variants={fadeInUp}
              className="group bg-card rounded-xl border border-border overflow-hidden"
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={t(`items.${project.key}.title`)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Overlay Links */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.link && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/90 rounded-full text-foreground hover:bg-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={t('viewProject')}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                  )}
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/90 rounded-full text-foreground hover:bg-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={t('viewCode')}
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-4 sm:p-5 md:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                  {t(`items.${project.key}.title`)}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {t(`items.${project.key}.description`)}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {(t.raw(`items.${project.key}.tags`) as string[]).map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
