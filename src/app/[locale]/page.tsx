'use client';

import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { Skills } from '@/components/Skills';
import { ProjectsCarousel } from '@/components/ProjectsCarousel';
import { LogoMarquee } from '@/components/LogoMarquee';
import { Testimonials } from '@/components/Testimonials';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <ProjectsCarousel />
        <LogoMarquee />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
