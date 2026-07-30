import dynamic from 'next/dynamic';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { About } from '@/components/About';
import { ClientDemos } from '@/components/ClientDemos';
import { Experience } from '@/components/Experience';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProjectsCarousel } from '@/components/ProjectsCarousel';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

const Education = dynamic(() => import('@/components/Education').then((m) => m.Education));
const Skills = dynamic(() => import('@/components/Skills').then((m) => m.Skills));
const Testimonials = dynamic(() => import('@/components/Testimonials').then((m) => m.Testimonials));
const CallToAction = dynamic(() => import('@/components/CallToAction').then((m) => m.CallToAction));

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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
