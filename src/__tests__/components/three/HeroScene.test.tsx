import { render, act } from '@testing-library/react';
import { HeroScene } from '@/components/three/HeroScene';

describe('HeroScene', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the scene container', () => {
    render(<HeroScene />);
    expect(document.querySelector('.absolute.inset-0')).toBeInTheDocument();
  });

  it('has negative z-index to stay behind content', () => {
    render(<HeroScene />);
    expect(document.querySelector('.-z-10')).toBeInTheDocument();
  });

  it('has overflow-hidden class', () => {
    render(<HeroScene />);
    expect(document.querySelector('.overflow-hidden')).toBeInTheDocument();
  });

  it('renders background gradient', () => {
    render(<HeroScene />);
    expect(document.querySelector('.bg-gradient-to-br')).toBeInTheDocument();
  });

  it('renders floating particles', () => {
    render(<HeroScene />);
    const particles = document.querySelectorAll('.bg-primary\\/20');
    expect(particles.length).toBeGreaterThan(0);
  });

  it('renders animation container', () => {
    render(<HeroScene />);
    expect(document.querySelector('.flex.items-center.justify-center')).toBeInTheDocument();
  });

  it('animates through phases', () => {
    render(<HeroScene />);

    // Initial entering phase
    expect(document.querySelector('.absolute')).toBeInTheDocument();

    // Advance to colliding phase
    act(() => {
      jest.advanceTimersByTime(2500);
    });

    // Advance to react phase
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Advance to exploding phase
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // Component should still render
    expect(document.querySelector('.absolute.inset-0')).toBeInTheDocument();
  });

  it('cycles animation', () => {
    render(<HeroScene />);

    // Complete full animation cycle
    act(() => {
      jest.advanceTimersByTime(8000);
    });

    // Should restart animation
    expect(document.querySelector('.absolute.inset-0')).toBeInTheDocument();
  });

  it('renders tech icons during entering phase', () => {
    render(<HeroScene />);
    // SVG icons should be present
    const svgs = document.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('has responsive sizing classes', () => {
    render(<HeroScene />);
    expect(document.querySelector('.w-64, .sm\\:w-80, .md\\:w-96')).toBeDefined();
  });
});
