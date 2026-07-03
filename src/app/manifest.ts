import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import type { MetadataRoute } from 'next';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const locale = routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    name: t('title'),
    short_name: 'Lennin Ibarra',
    description: t('description'),
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    lang: locale,
    icons: [
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
