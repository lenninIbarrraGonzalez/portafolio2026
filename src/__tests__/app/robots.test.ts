import robots from '@/app/robots';

const BASE_URL = 'https://lenninibarra.com';

describe('robots', () => {
  it('sitemap URL equals BASE_URL + /sitemap.xml', () => {
    const result = robots();
    expect(result.sitemap).toBe(`${BASE_URL}/sitemap.xml`);
  });

  it('has a rule that allows /', () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const hasAllowRoot = rules.some((rule) => rule.allow === '/' || rule.allow?.includes('/'));
    expect(hasAllowRoot).toBe(true);
  });

  it('disallows /api/', () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const disallowedPaths = rules.flatMap((rule) =>
      Array.isArray(rule.disallow) ? rule.disallow : rule.disallow ? [rule.disallow] : []
    );
    expect(disallowedPaths).toContain('/api/');
  });

  it('disallows /_next/', () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const disallowedPaths = rules.flatMap((rule) =>
      Array.isArray(rule.disallow) ? rule.disallow : rule.disallow ? [rule.disallow] : []
    );
    expect(disallowedPaths).toContain('/_next/');
  });
});
