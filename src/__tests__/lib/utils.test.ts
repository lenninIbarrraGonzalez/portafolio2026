import { cn } from '@/lib/utils';

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    const result = cn('foo', 'bar');
    expect(result).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    const result = cn('foo', true && 'bar', false && 'baz');
    expect(result).toBe('foo bar');
  });

  it('handles undefined and null values', () => {
    const result = cn('foo', undefined, null, 'bar');
    expect(result).toBe('foo bar');
  });

  it('handles empty strings', () => {
    const result = cn('foo', '', 'bar');
    expect(result).toBe('foo bar');
  });

  it('merges Tailwind classes correctly', () => {
    const result = cn('px-2 py-1', 'px-4');
    expect(result).toBe('py-1 px-4');
  });

  it('handles arrays of class names', () => {
    const result = cn(['foo', 'bar'], 'baz');
    expect(result).toBe('foo bar baz');
  });

  it('handles objects with boolean values', () => {
    const result = cn({ foo: true, bar: false, baz: true });
    expect(result).toBe('foo baz');
  });

  it('returns empty string for no arguments', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('handles complex Tailwind merging', () => {
    const result = cn(
      'text-sm text-gray-500',
      'text-lg',
      'hover:text-blue-500'
    );
    expect(result).toBe('text-gray-500 text-lg hover:text-blue-500');
  });

  it('handles conflicting margin classes', () => {
    const result = cn('mt-2 mb-2', 'mt-4');
    expect(result).toBe('mb-2 mt-4');
  });

  it('handles responsive variants', () => {
    const result = cn('sm:p-2', 'sm:p-4', 'md:p-6');
    expect(result).toBe('sm:p-4 md:p-6');
  });

  it('preserves non-conflicting classes', () => {
    const result = cn('flex items-center justify-between', 'gap-4');
    expect(result).toBe('flex items-center justify-between gap-4');
  });
});
