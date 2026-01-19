import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { ClientWrapper } from '@/components/ClientWrapper';
import '../globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://lenninibarra.com';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const metadata = messages.metadata as { title: string; description: string };

  const canonicalUrl = locale === routing.defaultLocale ? BASE_URL : `${BASE_URL}/${locale}`;
  const ogLocale = locale === 'es' ? 'es_CO' : 'en_US';
  const alternateLocale = locale === 'es' ? 'en_US' : 'es_CO';

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: metadata.title,
      template: `%s | Lennin Ibarra`,
    },
    description: metadata.description,
    keywords: [
      'Frontend Developer',
      'React',
      'TypeScript',
      'Next.js',
      'Portfolio',
      'Senior Frontend Engineer',
      'Web Developer',
      'JavaScript',
      'Lennin Ibarra',
      'Colombia',
    ],
    authors: [{ name: 'Lennin Ibarra', url: BASE_URL }],
    creator: 'Lennin Ibarra',
    publisher: 'Lennin Ibarra',
    icons: {
      icon: '/favicon.svg',
      apple: '/favicon.svg',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: BASE_URL,
        en: `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'Lennin Ibarra Portfolio',
      locale: ogLocale,
      alternateLocale: alternateLocale,
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Lennin Ibarra - Senior Frontend Engineer',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: ['/images/og-image.png'],
      creator: '@lenninibarra',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const metadata = messages.metadata as { title: string; description: string };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Lennin Ibarra',
    jobTitle: 'Senior Frontend Engineer',
    url: BASE_URL,
    sameAs: [
      'https://github.com/lenninIbarrraGonzalez',
      'https://www.linkedin.com/in/lennin-geovanny-ibarra/',
    ],
    knowsAbout: [
      'React',
      'TypeScript',
      'Next.js',
      'JavaScript',
      'Frontend Development',
      'Web Development',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Monks',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CO',
      addressLocality: 'Bogotá',
    },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: metadata.title,
    description: metadata.description,
    url: BASE_URL,
    inLanguage: locale === 'es' ? 'es-CO' : 'en-US',
    author: {
      '@type': 'Person',
      name: 'Lennin Ibarra',
    },
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ClientWrapper>{children}</ClientWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
