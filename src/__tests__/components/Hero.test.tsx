import { render, screen, fireEvent } from '@testing-library/react';
import { Hero } from '@/components/Hero';

// Mock TypewriterTitle component
jest.mock('@/components/TypewriterTitle', () => ({
  TypewriterTitle: ({ strings }: { strings: string[] }) => (
    <span data-testid="typewriter">{strings[0]}</span>
  ),
}));

// Mock CodeEditor component
jest.mock('@/components/CodeEditor', () => ({
  CodeEditor: ({ isInView }: { isInView: boolean }) => (
    <div data-testid="code-editor" data-in-view={isInView}>Code Editor</div>
  ),
}));

describe('Hero', () => {
  it('renders the hero section', () => {
    render(<Hero />);
    expect(document.querySelector('section')).toBeInTheDocument();
  });

  it('renders the greeting text', () => {
    render(<Hero />);
    expect(screen.getByText('greeting')).toBeInTheDocument();
  });

  it('renders the name with gradient text', () => {
    render(<Hero />);
    expect(screen.getByText('name')).toBeInTheDocument();
  });

  it('renders the TypewriterTitle component', () => {
    render(<Hero />);
    expect(screen.getByTestId('typewriter')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<Hero />);
    expect(screen.getByText('subtitle')).toBeInTheDocument();
  });

  it('renders the CTA button', () => {
    render(<Hero />);
    expect(screen.getByText('cta')).toBeInTheDocument();
  });

  it('renders the contact button', () => {
    render(<Hero />);
    expect(screen.getByText('contact')).toBeInTheDocument();
  });

  it('renders the download CV button', () => {
    render(<Hero />);
    expect(screen.getByText('downloadCV')).toBeInTheDocument();
  });

  it('renders download icon', () => {
    render(<Hero />);
    expect(screen.getByTestId('icon-download')).toBeInTheDocument();
  });

  it('renders the CodeEditor component', () => {
    render(<Hero />);
    expect(screen.getByTestId('code-editor')).toBeInTheDocument();
  });

  it('renders scroll indicator button', () => {
    render(<Hero />);
    expect(screen.getByLabelText('scrollDown')).toBeInTheDocument();
  });

  it('renders arrow down icon in scroll indicator', () => {
    render(<Hero />);
    expect(screen.getByTestId('icon-arrowdown')).toBeInTheDocument();
  });

  it('renders social links', () => {
    render(<Hero />);
    const socialLinks = document.querySelectorAll('[aria-label]');
    expect(socialLinks.length).toBeGreaterThan(0);
  });

  it('handles scroll to projects on CTA click', () => {
    // Create mock projects section
    const mockSection = document.createElement('section');
    mockSection.id = 'projects';
    mockSection.scrollIntoView = jest.fn();
    document.body.appendChild(mockSection);

    render(<Hero />);
    const ctaButton = screen.getByText('cta');
    fireEvent.click(ctaButton);

    expect(mockSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    // Cleanup
    document.body.removeChild(mockSection);
  });

  it('handles scroll to about on scroll indicator click', () => {
    // Create mock about section
    const mockSection = document.createElement('section');
    mockSection.id = 'about';
    mockSection.scrollIntoView = jest.fn();
    document.body.appendChild(mockSection);

    render(<Hero />);
    const scrollButton = screen.getByLabelText('scrollDown');
    fireEvent.click(scrollButton);

    expect(mockSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    // Cleanup
    document.body.removeChild(mockSection);
  });

  it('handles keyboard navigation on scroll indicator with Enter', () => {
    const mockSection = document.createElement('section');
    mockSection.id = 'about';
    mockSection.scrollIntoView = jest.fn();
    document.body.appendChild(mockSection);

    render(<Hero />);
    const scrollButton = screen.getByLabelText('scrollDown');
    fireEvent.keyDown(scrollButton, { key: 'Enter' });

    expect(mockSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    document.body.removeChild(mockSection);
  });

  it('handles keyboard navigation on scroll indicator with Space', () => {
    const mockSection = document.createElement('section');
    mockSection.id = 'about';
    mockSection.scrollIntoView = jest.fn();
    document.body.appendChild(mockSection);

    render(<Hero />);
    const scrollButton = screen.getByLabelText('scrollDown');
    fireEvent.keyDown(scrollButton, { key: ' ' });

    expect(mockSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    document.body.removeChild(mockSection);
  });

  it('does not scroll on other key presses', () => {
    const mockSection = document.createElement('section');
    mockSection.id = 'about';
    mockSection.scrollIntoView = jest.fn();
    document.body.appendChild(mockSection);

    render(<Hero />);
    const scrollButton = screen.getByLabelText('scrollDown');
    fireEvent.keyDown(scrollButton, { key: 'Tab' });

    expect(mockSection.scrollIntoView).not.toHaveBeenCalled();

    document.body.removeChild(mockSection);
  });

  it('handles missing target section gracefully', () => {
    render(<Hero />);
    const ctaButton = screen.getByText('cta');

    // Should not throw when section doesn't exist
    expect(() => fireEvent.click(ctaButton)).not.toThrow();
  });

  it('has min-h-screen class for full viewport height', () => {
    render(<Hero />);
    expect(document.querySelector('.min-h-screen')).toBeInTheDocument();
  });
});
