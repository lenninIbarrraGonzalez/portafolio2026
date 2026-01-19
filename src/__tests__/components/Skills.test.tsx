import { render, screen } from '@testing-library/react';
import { Skills } from '@/components/Skills';

describe('Skills', () => {
  it('renders the section with correct id', () => {
    render(<Skills />);
    expect(document.getElementById('skills')).toBeInTheDocument();
  });

  it('renders the section title', () => {
    render(<Skills />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders the decorative line under title', () => {
    render(<Skills />);
    const decorativeLine = document.querySelector('.bg-primary.rounded-full');
    expect(decorativeLine).toBeInTheDocument();
  });

  it('renders Frontend category', () => {
    render(<Skills />);
    expect(screen.getByText('Frontend')).toBeInTheDocument();
  });

  it('renders Backend category', () => {
    render(<Skills />);
    expect(screen.getByText('Backend')).toBeInTheDocument();
  });

  it('renders Tools category', () => {
    render(<Skills />);
    expect(screen.getByText('Tools')).toBeInTheDocument();
  });

  it('renders skill icons', () => {
    render(<Skills />);
    // Skills component uses react-icons/si which we mock
    const skillIcons = document.querySelectorAll('[data-testid^="si-icon"]');
    expect(skillIcons.length).toBeGreaterThan(0);
  });

  it('renders skill names', () => {
    render(<Skills />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('has responsive padding classes', () => {
    render(<Skills />);
    expect(document.querySelector('.py-12')).toBeInTheDocument();
  });

  it('renders skill items with hover effects', () => {
    render(<Skills />);
    const skillItems = document.querySelectorAll('.skill-item');
    expect(skillItems.length).toBeGreaterThan(0);
  });

  it('renders skill cards with border', () => {
    render(<Skills />);
    const cards = document.querySelectorAll('.border-border');
    expect(cards.length).toBeGreaterThan(0);
  });
});
