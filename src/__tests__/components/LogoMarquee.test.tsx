import { render, screen } from '@testing-library/react';
import { LogoMarquee } from '@/components/LogoMarquee';

describe('LogoMarquee', () => {
  it('renders the marquee container', () => {
    const { container } = render(<LogoMarquee />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has overflow-hidden class', () => {
    render(<LogoMarquee />);
    expect(document.querySelector('.overflow-hidden')).toBeInTheDocument();
  });

  it('renders technology names', () => {
    render(<LogoMarquee />);
    expect(screen.getAllByText('React').length).toBeGreaterThan(0);
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Next.js').length).toBeGreaterThan(0);
  });

  it('renders technology pills', () => {
    render(<LogoMarquee />);
    const pills = document.querySelectorAll('.rounded-full');
    expect(pills.length).toBeGreaterThan(0);
  });

  it('renders color indicators', () => {
    render(<LogoMarquee />);
    // Color dots should have backgroundColor style
    const colorDots = document.querySelectorAll('.w-2.h-2, .w-3.h-3');
    expect(colorDots.length).toBeGreaterThan(0);
  });

  it('duplicates technologies for seamless loop', () => {
    render(<LogoMarquee />);
    // Each technology should appear twice (original + duplicate)
    const reactElements = screen.getAllByText('React');
    expect(reactElements.length).toBeGreaterThanOrEqual(2);
  });

  it('has flex container for items', () => {
    render(<LogoMarquee />);
    expect(document.querySelector('.flex')).toBeInTheDocument();
  });

  it('has gap between items', () => {
    render(<LogoMarquee />);
    expect(document.querySelector('.gap-4')).toBeInTheDocument();
  });

  it('renders backdrop blur effect', () => {
    render(<LogoMarquee />);
    expect(document.querySelector('.backdrop-blur-sm')).toBeInTheDocument();
  });

  it('has padding class', () => {
    render(<LogoMarquee />);
    expect(document.querySelector('.py-8')).toBeInTheDocument();
  });
});
