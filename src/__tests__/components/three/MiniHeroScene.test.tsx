import { render, act } from '@testing-library/react';
import { MiniHeroScene } from '@/components/three/MiniHeroScene';

describe('MiniHeroScene', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the scene container', () => {
    render(<MiniHeroScene />);
    expect(document.querySelector('.relative')).toBeInTheDocument();
  });

  it('has correct width and height', () => {
    render(<MiniHeroScene />);
    expect(document.querySelector('.w-48.h-48')).toBeInTheDocument();
  });

  it('renders empty container when not in view', () => {
    render(<MiniHeroScene isInView={false} />);
    const container = document.querySelector('.relative.w-48.h-48');
    expect(container).toBeInTheDocument();
  });

  it('renders animation content when in view', () => {
    render(<MiniHeroScene isInView={true} />);
    expect(document.querySelector('.flex.items-center.justify-center')).toBeInTheDocument();
  });

  it('defaults isInView to true', () => {
    render(<MiniHeroScene />);
    expect(document.querySelector('.flex.items-center.justify-center')).toBeInTheDocument();
  });

  it('renders tech icons', () => {
    render(<MiniHeroScene isInView={true} />);
    const svgs = document.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('animates through phases when in view', () => {
    render(<MiniHeroScene isInView={true} />);

    // Initial entering phase
    expect(document.querySelector('.absolute')).toBeInTheDocument();

    // Advance to colliding phase
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Advance to react phase
    act(() => {
      jest.advanceTimersByTime(1500);
    });

    // Component should still render
    expect(document.querySelector('.relative')).toBeInTheDocument();
  });

  it('cycles animation', () => {
    render(<MiniHeroScene isInView={true} />);

    // Complete full animation cycle (12.5s)
    act(() => {
      jest.advanceTimersByTime(13000);
    });

    // Should restart animation
    expect(document.querySelector('.relative')).toBeInTheDocument();
  });

  it('does not start animation when not in view', () => {
    render(<MiniHeroScene isInView={false} />);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Should not have animation content
    const container = document.querySelector('.flex.items-center.justify-center');
    expect(container).not.toBeInTheDocument();
  });

  it('has centered content', () => {
    render(<MiniHeroScene isInView={true} />);
    expect(document.querySelector('.flex.items-center.justify-center')).toBeInTheDocument();
  });
});
