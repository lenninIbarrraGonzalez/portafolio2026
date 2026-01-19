import { render, screen } from '@testing-library/react';
import { Experience } from '@/components/Experience';

// Mock next/image
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  };
});

describe('Experience', () => {
  it('renders the section with correct id', () => {
    render(<Experience />);
    expect(document.getElementById('experience')).toBeInTheDocument();
  });

  it('renders the section title', () => {
    render(<Experience />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders the decorative line under title', () => {
    render(<Experience />);
    const decorativeLine = document.querySelector('.bg-primary.rounded-full');
    expect(decorativeLine).toBeInTheDocument();
  });

  it('renders timeline line', () => {
    render(<Experience />);
    expect(document.querySelector('.timeline-line')).toBeInTheDocument();
  });

  it('renders job cards', () => {
    render(<Experience />);
    // Should render multiple job entries
    const cards = document.querySelectorAll('.bg-card');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('renders calendar icons', () => {
    render(<Experience />);
    const calendarIcons = screen.getAllByTestId('icon-calendar');
    expect(calendarIcons.length).toBeGreaterThan(0);
  });

  it('renders chevron right icons for highlights', () => {
    render(<Experience />);
    const chevronIcons = screen.getAllByTestId('icon-chevronright');
    expect(chevronIcons.length).toBeGreaterThan(0);
  });

  it('has background color class', () => {
    render(<Experience />);
    expect(document.querySelector('.bg-secondary\\/30')).toBeInTheDocument();
  });

  it('has responsive padding classes', () => {
    render(<Experience />);
    expect(document.querySelector('.py-8')).toBeInTheDocument();
  });

  it('renders timeline dots', () => {
    render(<Experience />);
    const dots = document.querySelectorAll('.rounded-full.bg-primary');
    expect(dots.length).toBeGreaterThan(0);
  });
});

describe('FlipCard', () => {
  it('renders flip cards with group class for hover', () => {
    render(<Experience />);
    const flipCards = document.querySelectorAll('.group');
    expect(flipCards.length).toBeGreaterThan(0);
  });

  it('has perspective style on container', () => {
    render(<Experience />);
    const container = document.querySelector('.group');
    expect(container).toHaveStyle({ perspective: '1000px' });
  });

  it('has preserve-3d transform style', () => {
    render(<Experience />);
    const inner = document.querySelector('.group > div');
    expect(inner).toHaveStyle({ transformStyle: 'preserve-3d' });
  });

  it('has backface visibility hidden on front face', () => {
    render(<Experience />);
    const faces = document.querySelectorAll('.group .absolute.inset-0');
    expect(faces.length).toBeGreaterThan(0);
    faces.forEach(face => {
      expect(face).toHaveStyle({ backfaceVisibility: 'hidden' });
    });
  });
});
