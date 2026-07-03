jest.mock('@/i18n/routing', () => ({
  routing: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
  },
}));

import sitemap from '@/app/sitemap';

const BASE_URL = 'https://lenninibarra.com';

describe('sitemap', () => {
  it('returns exactly 2 entries', () => {
    const entries = sitemap();
    expect(entries).toHaveLength(2);
  });

  it('contains no anchor hash URLs', () => {
    const entries = sitemap();
    entries.forEach((entry) => {
      expect(entry.url).not.toContain('#');
    });
  });

  it('es entry URL equals BASE_URL', () => {
    const entries = sitemap();
    const esEntry = entries.find((e) => e.url === BASE_URL);
    expect(esEntry).toBeDefined();
  });

  it('en entry URL equals BASE_URL + /en', () => {
    const entries = sitemap();
    const enEntry = entries.find((e) => e.url === `${BASE_URL}/en`);
    expect(enEntry).toBeDefined();
  });

  it('both entries have alternates.languages with es and en keys', () => {
    const entries = sitemap();
    entries.forEach((entry) => {
      expect(entry.alternates).toBeDefined();
      expect(entry.alternates?.languages).toBeDefined();
      expect(entry.alternates?.languages).toHaveProperty('es');
      expect(entry.alternates?.languages).toHaveProperty('en');
    });
  });
});
