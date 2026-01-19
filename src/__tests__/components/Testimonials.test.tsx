import { render, screen } from '@testing-library/react';
import { Testimonials } from '@/components/Testimonials';

describe('Testimonials', () => {
  it('renders the section with correct id', () => {
    render(<Testimonials />);
    expect(document.getElementById('testimonials')).toBeInTheDocument();
  });

  it('renders the section title', () => {
    render(<Testimonials />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders the decorative line under title', () => {
    render(<Testimonials />);
    const decorativeLine = document.querySelector('.bg-primary.rounded-full');
    expect(decorativeLine).toBeInTheDocument();
  });

  it('renders testimonial cards', () => {
    render(<Testimonials />);
    const cards = document.querySelectorAll('.bg-card');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('renders quote icons', () => {
    render(<Testimonials />);
    const quoteIcons = screen.getAllByTestId('icon-quote');
    expect(quoteIcons.length).toBeGreaterThan(0);
  });

  it('renders blockquotes', () => {
    render(<Testimonials />);
    const blockquotes = document.querySelectorAll('blockquote');
    expect(blockquotes.length).toBeGreaterThan(0);
  });

  it('renders testimonial text', () => {
    render(<Testimonials />);
    const italicText = document.querySelectorAll('.italic');
    expect(italicText.length).toBeGreaterThan(0);
  });

  it('renders author names', () => {
    render(<Testimonials />);
    const citeElements = document.querySelectorAll('cite');
    expect(citeElements.length).toBeGreaterThan(0);
  });

  it('has responsive padding classes', () => {
    render(<Testimonials />);
    expect(document.querySelector('.py-12')).toBeInTheDocument();
  });

  it('has responsive grid layout', () => {
    render(<Testimonials />);
    const grid = document.querySelector('.grid');
    expect(grid).toBeInTheDocument();
  });

  it('renders author avatars', () => {
    render(<Testimonials />);
    const avatars = document.querySelectorAll('.rounded-full');
    expect(avatars.length).toBeGreaterThan(0);
  });
});
