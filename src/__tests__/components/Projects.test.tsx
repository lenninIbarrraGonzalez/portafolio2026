import { render, screen } from '@testing-library/react';
import { Projects } from '@/components/Projects';

describe('Projects', () => {
  it('renders the section with correct id', () => {
    render(<Projects />);
    expect(document.getElementById('projects')).toBeInTheDocument();
  });

  it('renders the section title', () => {
    render(<Projects />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders the decorative line under title', () => {
    render(<Projects />);
    const decorativeLine = document.querySelector('.bg-primary.rounded-full');
    expect(decorativeLine).toBeInTheDocument();
  });

  it('renders project cards', () => {
    render(<Projects />);
    const articles = screen.getAllByRole('article');
    expect(articles.length).toBeGreaterThan(0);
  });

  it('renders project images', () => {
    render(<Projects />);
    const images = document.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('renders project titles', () => {
    render(<Projects />);
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings.length).toBeGreaterThan(0);
  });

  it('renders project descriptions', () => {
    render(<Projects />);
    const descriptions = document.querySelectorAll('.text-muted-foreground');
    expect(descriptions.length).toBeGreaterThan(0);
  });

  it('renders project tags', () => {
    render(<Projects />);
    const tags = document.querySelectorAll('.bg-secondary');
    expect(tags.length).toBeGreaterThan(0);
  });

  it('has background color class', () => {
    render(<Projects />);
    expect(document.querySelector('.bg-secondary\\/30')).toBeInTheDocument();
  });

  it('has responsive grid layout', () => {
    render(<Projects />);
    const grid = document.querySelector('.grid');
    expect(grid).toBeInTheDocument();
  });

  it('renders cards with border', () => {
    render(<Projects />);
    const cards = document.querySelectorAll('.border-border');
    expect(cards.length).toBeGreaterThan(0);
  });
});
