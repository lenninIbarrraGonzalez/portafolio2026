import { BASE_URL } from '@/lib/config';
import {
  buildPersonSchema,
  buildWebSiteSchema,
  buildProfilePageSchema,
  buildProjectsItemListSchema,
} from '@/lib/structured-data';

const testSkills = ['React', 'TypeScript'];
const testAlumni = [{ name: 'Test Uni' }];
const testProjects = [
  { title: 'P1', description: 'D1', technologies: ['React'] },
  { title: 'P2', description: 'D2', technologies: ['TypeScript'] },
  { title: 'P3', description: 'D3', technologies: ['Next.js'] },
];

describe('structured-data', () => {
  describe('buildPersonSchema', () => {
    it('has @type Person', () => {
      const schema = buildPersonSchema(testSkills, testAlumni);
      expect(schema['@type']).toBe('Person');
    });

    it('@id ends with #person', () => {
      const schema = buildPersonSchema(testSkills, testAlumni);
      expect(schema['@id']).toMatch(/#person$/);
    });

    it('sameAs includes GitHub URL', () => {
      const schema = buildPersonSchema(testSkills, testAlumni);
      const sameAs = schema.sameAs as string[];
      expect(sameAs.some((url) => url.includes('github.com'))).toBe(true);
    });

    it('sameAs includes LinkedIn URL', () => {
      const schema = buildPersonSchema(testSkills, testAlumni);
      const sameAs = schema.sameAs as string[];
      expect(sameAs.some((url) => url.includes('linkedin.com'))).toBe(true);
    });

    it('knowsLanguage includes Spanish', () => {
      const schema = buildPersonSchema(testSkills, testAlumni);
      const langs = schema.knowsLanguage as string[];
      expect(langs.some((l) => l.toLowerCase().includes('spanish'))).toBe(true);
    });

    it('knowsLanguage includes English', () => {
      const schema = buildPersonSchema(testSkills, testAlumni);
      const langs = schema.knowsLanguage as string[];
      expect(langs.some((l) => l.toLowerCase().includes('english'))).toBe(true);
    });

    it('hasOccupation has @type Occupation', () => {
      const schema = buildPersonSchema(testSkills, testAlumni);
      const occ = schema.hasOccupation as Record<string, unknown>;
      expect(occ['@type']).toBe('Occupation');
    });

    it('nationality is Colombia', () => {
      const schema = buildPersonSchema(testSkills, testAlumni);
      const nat = schema.nationality as Record<string, unknown>;
      expect(nat.name).toBe('Colombia');
    });

    it('alumniOf is present and is an array', () => {
      const schema = buildPersonSchema(testSkills, testAlumni);
      expect(Array.isArray(schema.alumniOf)).toBe(true);
      expect((schema.alumniOf as unknown[]).length).toBeGreaterThan(0);
    });

    it('Person name is exactly "Lennin Ibarra"', () => {
      expect(buildPersonSchema(testSkills, testAlumni).name).toBe('Lennin Ibarra');
    });
  });

  describe('buildWebSiteSchema', () => {
    it('@id ends with #website', () => {
      const schema = buildWebSiteSchema('es', 'Title', 'Desc');
      expect(schema['@id']).toMatch(/#website$/);
    });

    it('inLanguage is es-CO for locale es', () => {
      const schema = buildWebSiteSchema('es', 'Title', 'Desc');
      expect(schema.inLanguage).toBe('es-CO');
    });

    it('inLanguage is en-US for locale en', () => {
      const schema = buildWebSiteSchema('en', 'Title', 'Desc');
      expect(schema.inLanguage).toBe('en-US');
    });
  });

  describe('buildProfilePageSchema', () => {
    it('@type is ProfilePage', () => {
      const schema = buildProfilePageSchema('es', 'Title', 'Desc');
      expect(schema['@type']).toBe('ProfilePage');
    });

    it("mainEntity['@id'] ends with #person", () => {
      const schema = buildProfilePageSchema('es', 'Title', 'Desc');
      const mainEntity = schema.mainEntity as Record<string, unknown>;
      expect(mainEntity['@id']).toMatch(/#person$/);
    });

    it("isPartOf['@id'] ends with #website", () => {
      const schema = buildProfilePageSchema('es', 'Title', 'Desc');
      const isPartOf = schema.isPartOf as Record<string, unknown>;
      expect(isPartOf['@id']).toMatch(/#website$/);
    });

    it('url is BASE_URL for es locale', () => {
      const schema = buildProfilePageSchema('es', 'Title', 'Desc');
      expect(schema.url).toBe(BASE_URL);
    });

    it('url is BASE_URL/en for en locale', () => {
      const schema = buildProfilePageSchema('en', 'Title', 'Desc');
      expect(schema.url).toBe(`${BASE_URL}/en`);
    });
  });

  describe('buildProjectsItemListSchema', () => {
    it('@type is ItemList', () => {
      const schema = buildProjectsItemListSchema(testProjects);
      expect(schema['@type']).toBe('ItemList');
    });

    it('has at least 3 items', () => {
      const schema = buildProjectsItemListSchema(testProjects);
      const items = schema.itemListElement as unknown[];
      expect(items.length).toBeGreaterThanOrEqual(3);
    });

    it('items have sequential positions starting from 1', () => {
      const schema = buildProjectsItemListSchema(testProjects);
      const items = schema.itemListElement as Array<Record<string, unknown>>;
      items.forEach((item, index) => {
        expect(item.position).toBe(index + 1);
      });
    });

    it('each item has name and description', () => {
      const schema = buildProjectsItemListSchema(testProjects);
      const items = schema.itemListElement as Array<Record<string, unknown>>;
      items.forEach((item) => {
        expect(typeof item.name).toBe('string');
        expect((item.name as string).length).toBeGreaterThan(0);
        const itemItem = item.item as Record<string, unknown>;
        expect(typeof itemItem.description).toBe('string');
        expect((itemItem.description as string).length).toBeGreaterThan(0);
      });
    });
  });

  describe('@context cross-schema', () => {
    it('@context is https://schema.org on all schemas', () => {
      expect(buildPersonSchema(testSkills, testAlumni)['@context']).toBe('https://schema.org');
      expect(buildWebSiteSchema('es', 'T', 'D')['@context']).toBe('https://schema.org');
      expect(buildProfilePageSchema('es', 'T', 'D')['@context']).toBe('https://schema.org');
      expect(buildProjectsItemListSchema(testProjects)['@context']).toBe('https://schema.org');
    });

    it('ProfilePage mainEntity @id cross-references Person @id', () => {
      const person = buildPersonSchema(testSkills, testAlumni);
      const page = buildProfilePageSchema('es', 'T', 'D');
      expect((page.mainEntity as Record<string, unknown>)['@id']).toBe(person['@id']);
    });

    it('WebSite @id is referenced by ProfilePage isPartOf', () => {
      const site = buildWebSiteSchema('es', 'T', 'D');
      const page = buildProfilePageSchema('es', 'T', 'D');
      expect((page.isPartOf as Record<string, unknown>)['@id']).toBe(site['@id']);
    });
  });

  describe('XSS safety', () => {
    it('JSON output does not contain unescaped </script> in skills', () => {
      const dangerousSkills = ['React', '</script><script>alert(1)'];
      const output = JSON.stringify(buildPersonSchema(dangerousSkills, testAlumni));
      expect(output).not.toContain('</script>');
    });
  });
});
