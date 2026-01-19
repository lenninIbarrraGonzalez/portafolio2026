import { render } from '@testing-library/react';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

describe('ScrollProgress', () => {
  it('renders the progress bar', () => {
    render(<ScrollProgress />);
    const progressBar = document.querySelector('.fixed');
    expect(progressBar).toBeInTheDocument();
  });

  it('has fixed positioning', () => {
    render(<ScrollProgress />);
    const progressBar = document.querySelector('.fixed');
    expect(progressBar).toHaveClass('fixed');
  });

  it('is positioned at the top', () => {
    render(<ScrollProgress />);
    const progressBar = document.querySelector('.top-0');
    expect(progressBar).toBeInTheDocument();
  });

  it('spans full width', () => {
    render(<ScrollProgress />);
    const progressBar = document.querySelector('.left-0.right-0');
    expect(progressBar).toBeInTheDocument();
  });

  it('has correct height', () => {
    render(<ScrollProgress />);
    const progressBar = document.querySelector('.h-1');
    expect(progressBar).toBeInTheDocument();
  });

  it('has primary background color', () => {
    render(<ScrollProgress />);
    const progressBar = document.querySelector('.bg-primary');
    expect(progressBar).toBeInTheDocument();
  });

  it('has left origin for scale animation', () => {
    render(<ScrollProgress />);
    const progressBar = document.querySelector('.origin-left');
    expect(progressBar).toBeInTheDocument();
  });

  it('has high z-index', () => {
    render(<ScrollProgress />);
    const progressBar = document.querySelector('.z-\\[100\\]');
    expect(progressBar).toBeInTheDocument();
  });

  it('renders a single progress bar element', () => {
    const { container } = render(<ScrollProgress />);
    expect(container.children.length).toBe(1);
  });
});
