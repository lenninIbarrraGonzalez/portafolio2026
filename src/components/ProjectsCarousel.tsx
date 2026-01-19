'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ProjectModal } from '@/components/ProjectModal';

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

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function TiltCard({ children, className = '', onClick }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('');
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ transform, transition: 'transform 0.1s ease-out' }}
    >
      {children}
    </div>
  );
}

export function ProjectsCarousel() {
  const t = useTranslations('projects');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    skipSnaps: false,
    dragFree: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const handleProjectClick = (project: typeof projects[0]) => {
    const projectData = {
      ...project,
      title: t(`items.${project.key}.title`),
      description: t(`items.${project.key}.description`),
      tags: t.raw(`items.${project.key}.tags`) as string[],
    };
    setSelectedProject(projectData);
  };

  return (
    <section id="projects" className="py-8 sm:py-10 lg:py-14 bg-secondary/30 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('title')}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Carousel */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative"
        >
          <div className="embla" ref={emblaRef}>
            <div className="embla__container -ml-4">
              {projects.map((project, index) => (
                <div
                  key={project.key}
                  className="embla__slide pl-4"
                >
                  <TiltCard
                    className="cursor-pointer"
                    onClick={() => handleProjectClick(project)}
                  >
                    <motion.article
                      className={`bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 ${
                        index === selectedIndex
                          ? 'scale-100 opacity-100'
                          : 'scale-95 opacity-70'
                      }`}
                      whileHover={{ y: -10 }}
                    >
                      {/* Project Image */}
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={project.image}
                          alt={t(`items.${project.key}.title`)}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white font-medium px-4 py-2 bg-primary rounded-lg">
                            View Details
                          </span>
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {t(`items.${project.key}.title`)}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {t(`items.${project.key}.description`)}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {(t.raw(`items.${project.key}.tags`) as string[])
                            .slice(0, 3)
                            .map((tag: string) => (
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
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <MagneticButton
              onClick={scrollPrev}
              className="p-3 bg-card border border-border rounded-full hover:bg-secondary transition-colors disabled:opacity-50"
              strength={0.2}
            >
              <ChevronLeft className="w-5 h-5" />
            </MagneticButton>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? 'w-8 bg-primary'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <MagneticButton
              onClick={scrollNext}
              className="p-3 bg-card border border-border rounded-full hover:bg-secondary transition-colors disabled:opacity-50"
              strength={0.2}
            >
              <ChevronRight className="w-5 h-5" />
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
