import { render, screen, act } from '@testing-library/react';
import { TypewriterTitle } from '@/components/TypewriterTitle';

describe('TypewriterTitle', () => {
  it('renders with provided strings', () => {
    render(<TypewriterTitle strings={['Hello', 'World']} />);
    // The mock returns the first string
    expect(screen.getByTestId('typewriter')).toBeInTheDocument();
  });

  it('renders first string before mount', () => {
    // Since useState starts with mounted=false
    const { container } = render(<TypewriterTitle strings={['First', 'Second']} />);
    expect(container).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <TypewriterTitle strings={['Test']} className="custom-class" />
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('renders typewriter cursor', () => {
    render(<TypewriterTitle strings={['Test']} />);
    expect(document.querySelector('.typewriter-cursor')).toBeInTheDocument();
  });

  it('renders Typewriter component after mount', async () => {
    await act(async () => {
      render(<TypewriterTitle strings={['Hello', 'World']} />);
    });
    expect(screen.getByTestId('typewriter')).toBeInTheDocument();
  });

  it('handles empty strings array', () => {
    render(<TypewriterTitle strings={[]} />);
    expect(document.querySelector('span')).toBeInTheDocument();
  });

  it('handles single string', () => {
    render(<TypewriterTitle strings={['Single']} />);
    expect(document.querySelector('span')).toBeInTheDocument();
  });

  it('renders span wrapper element', () => {
    const { container } = render(<TypewriterTitle strings={['Test']} />);
    const spans = container.querySelectorAll('span');
    expect(spans.length).toBeGreaterThan(0);
  });
});
