import { JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { ClientWrapper } from '@/components/ClientWrapper';
import { JsonLd } from '@/components/JsonLd';
import { routing } from '@/i18n/routing';
import { BASE_URL } from '@/lib/config';
import {
  buildPersonSchema,
  buildWebSiteSchema,
  buildProfilePageSchema,
  buildProjectsItemListSchema,
} from '@/lib/structured-data';
import enMessages from '@/messages/en.json';
import esMessages from '@/messages/es.json';
import type { Metadata } from 'next';
import '../globals.css';

// Typed, build-time access to message content for metadata and structured data.
// next-intl's runtime getMessages() stays for the client provider only.
const contentByLocale = { es: esMessages, en: enMessages };

function getContent(locale: string) {
  return contentByLocale[locale as keyof typeof contentByLocale] ?? esMessages;
}

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { metadata } = getContent(locale);

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
    keywords: metadata.keywords,
    authors: [{ name: 'Lennin Ibarra', url: BASE_URL }],
    creator: 'Lennin Ibarra',
    publisher: 'Lennin Ibarra',
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
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
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
  const content = getContent(locale);
  const { metadata } = content;

  const skills = Object.values(content.skills.categories).flatMap((c) => c.skills);
  const alumni = Object.values(content.education.items).map((e) => ({
    name: e.institution,
    location: e.location,
    description: e.description,
  }));
  const projects = Object.values(content.projects.items).map((p) => ({
    title: p.title,
    description: p.description,
    technologies: p.tags ?? [],
  }));

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                let theme = localStorage.getItem('theme');
                if (!theme) {
                  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
                  theme = prefersLight ? 'light' : 'dark';
                }
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        <JsonLd schema={buildPersonSchema(skills, alumni)} />
        <JsonLd schema={buildWebSiteSchema(locale, metadata.title, metadata.description)} />
        <JsonLd schema={buildProfilePageSchema(locale, metadata.title, metadata.description)} />
        <JsonLd schema={buildProjectsItemListSchema(projects)} />
      </head>
      <body
        className={`${jetbrainsMono.className} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ClientWrapper>{children}</ClientWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
