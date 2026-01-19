import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://lenninibarra.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const lastModified = new Date();

  // Generate entries for the home page in each locale
  const homePages = locales.map((locale) => ({
    url: locale === routing.defaultLocale ? BASE_URL : `${BASE_URL}/${locale}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, l === routing.defaultLocale ? BASE_URL : `${BASE_URL}/${l}`])
      ),
    },
  }));

  // Define sections for anchor links (these are single-page sections)
  const sections = ['about', 'experience', 'education', 'skills', 'projects', 'testimonials', 'contact'];

  const sectionPages = sections.flatMap((section) =>
    locales.map((locale) => ({
      url: locale === routing.defaultLocale
        ? `${BASE_URL}/#${section}`
        : `${BASE_URL}/${locale}/#${section}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  );

  return [...homePages, ...sectionPages];
}
