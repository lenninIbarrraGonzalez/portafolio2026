const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://lenninibarra.com';

// Skills sourced from en.json skills.categories
const ALL_SKILLS = [
  // Frontend
  'React',
  'Next.js',
  'TypeScript',
  'Vue.js',
  'Tailwind CSS',
  'Framer Motion',
  // Backend
  'Node.js',
  'Python',
  'REST APIs',
  'GraphQL',
  'PostgreSQL',
  'MongoDB',
  // Tools
  'Git',
  'Docker',
  'AWS',
  'Vercel',
  'Figma',
  'Jest',
  // Soft skills
  'Technical leadership',
  'Mentoring',
  'Communication',
  'Teamwork',
  'Problem solving',
];

// Education sourced from en.json education.items
const ALUMNI_OF = [
  {
    '@type': 'EducationalOrganization',
    name: 'Universidad de Nariño',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pasto',
      addressCountry: 'CO',
    },
  },
  {
    '@type': 'EducationalOrganization',
    name: 'Processmaker Certification',
    description: 'Advanced Architect and Developer in BPM',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bogotá',
      addressCountry: 'CO',
    },
  },
];

// Projects sourced from en.json projects.items
const PROJECTS = [
  {
    key: 'ditu',
    name: 'DITU - Streaming Platform',
    description:
      'Streaming platform for Caracol TV developed at Media.Monks. Modern architecture with React and performance optimization for millions of users.',
    tags: ['SolidJS', 'Tizen', 'NPAW'],
  },
  {
    key: 'bpmn',
    name: 'BPMN Process Editor',
    description:
      'Visual business process editor for Hoitsu. Allows designing and automating workflows with intuitive drag & drop.',
    tags: ['Next.js', 'GraphQL', 'GitHub'],
  },
  {
    key: 'tigo',
    name: 'Tigo E-commerce',
    description:
      'E-commerce platform for Tigo Colombia developed at Indra. Optimized purchase flows and integration with multiple payment gateways.',
    tags: ['jQuery', 'HTML', 'CSS'],
  },
  {
    key: 'romancerelax',
    name: 'Romance Relax E-commerce',
    description:
      'Online store developed with VTEX IO for IT Globers. Personalized shopping experience and high performance.',
    tags: ['VTEX IO', 'React', 'E-commerce'],
  },
  {
    key: 'informando',
    name: 'Informando - Citizen Participation',
    description:
      'Citizen participation application developed for ParqueSoft Nariño. Allows citizens to report and track local issues.',
    tags: ['Ushahidi', 'Google Maps', 'Mobile', 'Government'],
  },
  {
    key: 'pqrd',
    name: 'Government PQRD System',
    description:
      'Petitions, Complaints, Claims and Reports system for government entities. Complete management of the citizen service cycle.',
    tags: ['ProcessMaker', 'Digital Ocean', 'CentOS'],
  },
];

export function buildPersonSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE_URL}/#person`,
    name: 'Lennin Ibarra',
    givenName: 'Lennin',
    familyName: 'Ibarra',
    jobTitle: 'Senior Frontend Engineer',
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
    knowsAbout: ALL_SKILLS,
    alumniOf: ALUMNI_OF,
    worksFor: {
      '@type': 'Organization',
      name: 'Monks',
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
      skills: ALL_SKILLS.slice(0, 18).join(', '),
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

export function buildProjectsItemListSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Featured Projects by Lennin Ibarra',
    description: 'Portfolio of frontend development projects',
    itemListElement: PROJECTS.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: project.name,
      item: {
        '@type': 'CreativeWork',
        name: project.name,
        description: project.description,
        keywords: project.tags.join(', '),
        author: {
          '@id': `${BASE_URL}/#person`,
        },
      },
    })),
  };
}
