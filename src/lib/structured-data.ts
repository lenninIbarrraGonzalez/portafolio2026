import { BASE_URL } from '@/lib/config';

export interface AlumniInput {
  name: string;
  location?: string;
  description?: string;
}

export interface ProjectInput {
  title: string;
  description: string;
  technologies: string[];
  url?: string;
}

function toProjectSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function buildPersonSchema(
  skills: string[],
  alumniOf: AlumniInput[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE_URL}/#person`,
    name: 'Lennin Ibarra',
    givenName: 'Lennin',
    familyName: 'Ibarra',
    jobTitle: 'Senior Frontend Engineer',
    description:
      'Senior Frontend Engineer with 10+ years specializing in React, TypeScript, and Next.js. Currently Front-End Architect at Monks, building scalable streaming platforms for Caracol TV.',
    email: 'ing.lenninibarra@gmail.com',
    url: BASE_URL,
    sameAs: [
      'https://github.com/lenninIbarrraGonzalez',
      'https://www.linkedin.com/in/lennin-geovanny-ibarra/',
    ],
    nationality: {
      '@type': 'Country',
      name: 'Colombia',
    },
    knowsLanguage: ['Spanish', 'English'],
    knowsAbout: skills,
    alumniOf: alumniOf.map((a) => ({
      '@type': 'EducationalOrganization',
      name: a.name,
      ...(a.description ? { description: a.description } : {}),
      ...(a.location
        ? {
            address: {
              '@type': 'PostalAddress',
              addressLocality: a.location,
              addressCountry: 'CO',
            },
          }
        : {}),
    })),
    worksFor: {
      '@type': 'Organization',
      '@id': 'https://www.monks.com/#organization',
      name: 'Monks',
      url: 'https://www.monks.com',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bogotá',
      addressCountry: 'CO',
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Senior Frontend Engineer',
      occupationalCategory: '15-1252.00',
      skills: skills.slice(0, 18).join(', '),
      occupationLocation: {
        '@type': 'Country',
        name: 'Colombia',
      },
    },
  };
}

export function buildWebSiteSchema(
  locale: string,
  title: string,
  description: string
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: title,
    description,
    url: BASE_URL,
    inLanguage: locale === 'es' ? 'es-CO' : 'en-US',
    author: {
      '@id': `${BASE_URL}/#person`,
    },
  };
}

export function buildProfilePageSchema(
  locale: string,
  title: string,
  description: string
): Record<string, unknown> {
  const pageUrl = locale === 'es' ? BASE_URL : `${BASE_URL}/${locale}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: title,
    description,
    url: pageUrl,
    inLanguage: locale === 'es' ? 'es-CO' : 'en-US',
    isPartOf: {
      '@id': `${BASE_URL}/#website`,
    },
    about: {
      '@id': `${BASE_URL}/#person`,
    },
    mainEntity: {
      '@id': `${BASE_URL}/#person`,
    },
  };
}

export function buildProjectsItemListSchema(
  projects: ProjectInput[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Featured Projects by Lennin Ibarra',
    description: 'Portfolio of frontend development projects',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      '@id': `${BASE_URL}/#project-${toProjectSlug(project.title)}`,
      name: project.title,
      ...(project.url ? { url: project.url } : {}),
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        keywords: project.technologies.join(', '),
        author: {
          '@id': `${BASE_URL}/#person`,
        },
      },
    })),
  };
}
