import { setRequestLocale } from 'next-intl/server';
import { About } from '@/components/About';
import { CallToAction } from '@/components/CallToAction';
import { ClientDemos } from '@/components/ClientDemos';
import { Education } from '@/components/Education';
import { Experience } from '@/components/Experience';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProjectsCarousel } from '@/components/ProjectsCarousel';
import { Skills } from '@/components/Skills';
import { Testimonials } from '@/components/Testimonials';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <ProjectsCarousel />
        <ClientDemos />
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
