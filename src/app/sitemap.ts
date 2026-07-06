import { routing } from '@/i18n/routing';
import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://lenninibarra.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const lastModified = new Date();

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

  return homePages;
}
