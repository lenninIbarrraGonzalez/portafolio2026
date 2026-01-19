'use client';

import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { Education } from '@/components/Education';
import { Skills } from '@/components/Skills';
import { ProjectsCarousel } from '@/components/ProjectsCarousel';
import { Testimonials } from '@/components/Testimonials';
import { CallToAction } from '@/components/CallToAction';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <ProjectsCarousel />
        <Education />
        <Skills />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
