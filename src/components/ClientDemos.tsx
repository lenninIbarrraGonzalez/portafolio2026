'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useCallback, useRef } from 'react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { fadeInUp } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { useCarouselSelection } from '@/lib/hooks/useCarouselSelection';

const demos = [
  { key: 'monks', image: '/images/demos/monks.png', url: 'https://monks-vod.vercel.app/' },
  { key: 'neostella', image: '/images/demos/neostella.png', url: 'https://neostella.vercel.app/' },
  { key: 'parkinkcentro', image: '/images/demos/parkinkcentro.png', url: 'https://parkinkgsas.vercel.app/' },
  { key: 'bpmn', image: '/images/demos/prototipobpmn.png', url: 'https://processflow-three.vercel.app/es/login' },
  { key: 'parkink', image: '/images/demos/parkinksas.png', url: 'https://parkingv2-lake.vercel.app/' },
  { key: 'gestiondocumental', image: '/images/demos/gestiondocumental.png', url: 'https://gestion-documental-rose.vercel.app/login' },
  { key: 'processflow', image: '/images/demos/processflow.png', url: 'https://processflowiswo.vercel.app/' },
];

export function ClientDemos() {
  const t = useTranslations('clientDemos');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    skipSnaps: false,
    dragFree: true,
  });

  const { selectedIndex } = useCarouselSelection(emblaApi);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const openDemo = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-8 sm:py-10 lg:py-14 overflow-hidden" ref={ref}>
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

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative"
        >
          <div className="embla" ref={emblaRef}>
            <div className="embla__container -ml-4">
              {demos.map((demo, index) => (
                <div key={demo.key} className="embla__slide pl-4">
                  <motion.article
                    className={cn(
                      'relative rounded-xl overflow-hidden cursor-pointer border border-border transition-all duration-300',
                      index === selectedIndex ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
                    )}
                    whileHover={{ scale: 1.02, opacity: 1 }}
                    onClick={() => openDemo(demo.url)}
                  >
                    {/* Screenshot */}
                    <div className="relative aspect-video overflow-hidden bg-secondary">
                      <Image
                        src={demo.image}
                        alt={t(`items.${demo.key}.title`)}
                        fill
                        className="object-cover object-top transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      {/* Permanent bottom gradient with project name */}
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent flex items-end px-4 pb-3">
                        <span className="text-white font-semibold text-base leading-tight">
                          {t(`items.${demo.key}.title`)}
                        </span>
                      </div>

                      {/* Hover overlay with "Ver demo" button */}
                      <motion.div
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg shadow-lg">
                          {t('viewDemo')}
                          <ExternalLink className="w-4 h-4" />
                        </span>
                      </motion.div>
                    </div>
                  </motion.article>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <MagneticButton
              onClick={scrollPrev}
              aria-label="Previous slide"
              className="p-3 bg-card border border-border rounded-full hover:bg-secondary transition-colors"
              strength={0.2}
            >
              <ChevronLeft className="w-5 h-5" />
            </MagneticButton>

            <div className="flex items-center gap-2">
              {demos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    index === selectedIndex
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <MagneticButton
              onClick={scrollNext}
              aria-label="Next slide"
              className="p-3 bg-card border border-border rounded-full hover:bg-secondary transition-colors"
              strength={0.2}
            >
              <ChevronRight className="w-5 h-5" />
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
